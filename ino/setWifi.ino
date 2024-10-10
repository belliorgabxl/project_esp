#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <EEPROM.h>

// WiFi
const char *ssid = "Jordy";
const char *password = "12345678";

// MQTT Broker
const char *mqtt_broker = "4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud";
const char *topic = "esp32/car/1011";
const char *mqtt_username = "admin";
const char *mqtt_password = "Bam1234!";
const int mqtt_port = 8883;

//Engine pin
const int EN1 = 12;
const int EN2 = 14;

//command pin
const int INP1 = 27;
const int INP2 = 26;
const int INP3 = 25;
const int INP4 = 33;

#define EEPROM_SIZE 512

WiFiClientSecure espClient;
PubSubClient client(espClient);

void setup() {
    Serial.begin(115200);
    pinMode(EN1,OUTPUT);
    pinMode(EN2,OUTPUT);
    pinMode(INP1,OUTPUT);
    pinMode(INP2,OUTPUT);
    pinMode(INP3,OUTPUT);
    pinMode(INP4,OUTPUT);

    digitalWrite(EN1, HIGH);  // set full speed
    digitalWrite(EN2, HIGH); 

  if (!EEPROM.begin(EEPROM_SIZE)) {
    Serial.println("Failed to initialize EEPROM");
    return;
  }

  // Read getwfn from EEPROM
  String getwfn;
  for (int i = 0; true; i++) {
      char c = EEPROM.read(i);
      if (c == '\0') break;
      getwfn += c;
  }

  // Read getwfp from EEPROM
  String getwfp;
  int pwdStart = getwfn.length() + 1;
  for (int i = pwdStart; true; i++) {
      char c = EEPROM.read(i);
      if (c == '\0') break;
      getwfp += c;
  }
  //Check wi-fi default
  if (getwfn.length() > 0 && getwfp.length() > 0) {
      Serial.print("WiFi-name: ");
      Serial.println(getwfn);
      Serial.print("Password: ");
      Serial.println(getwfp);
      Serial.println("\n===========  [CUSTOMIZE] New Wi-fi  ===========\n");

      // เชื่อมต่อกับ WiFi
      WiFi.begin(getwfn, getwfp);
      while (WiFi.status() != WL_CONNECTED) {
          digitalWrite(2,HIGH);
          delay(500);
          Serial.println(">>>>  Connecting to [Local] WiFi..");
      }
      Serial.println(">>>>  Connected to the WiFi network");
  }
  else {
      Serial.println("\n===========  [INITIAL] Default Wi-fi  ===========\n");
      // เชื่อมต่อกับ WiFi
      WiFi.begin(ssid, password);
      while (WiFi.status() != WL_CONNECTED) {
          digitalWrite(2,HIGH);
          delay(500);
          Serial.println("-------  Connecting to WiFi..  -------");
      }
      Serial.println("-------  Connected to the WiFi network  -------");
  }
  
    

    // เปิดการเชื่อมต่อ TLS/SSL
    espClient.setInsecure();

    // เชื่อมต่อกับ MQTT Broker
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public HiveMQ MQTT broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }
    client.subscribe(topic);
}

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.printf("\nMessage arrived in topic: ");
    Serial.print(topic);
    String message;
    String wfn;
    String wfp;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    if(message.startsWith("wfn")){
      for (int i = 0; i < EEPROM_SIZE; i++) {
        EEPROM.write(i, 0);
        }
        EEPROM.commit(); 
        Serial.println("\n\n===========  [ EEPROM Clearing Old data... ]  ===========\n");

      char buffer[100];
      message.toCharArray(buffer, 100); // Convert String to char array
      char *pair = strtok(buffer, ",");
      char key[50], value[50];
      while (pair != NULL) {
          sscanf(pair, "%49[^:]:%49s", key, value);
          if (strcmp(key, "wfn") == 0) {
              wfn = value;
          } else if (strcmp(key, "wfp") == 0) {
              wfp = value;
          }
          pair = strtok(NULL, ",");
      }
      Serial.printf("[Payload Detail] >> ");
      Serial.print(message);
      Serial.printf("\n New Wi-fi Name : ");
      Serial.print(wfn);
      Serial.printf("\n New Wi-fi Password : ");
      Serial.print(wfp);
       for (int i = 0; i < wfn.length(); i++) {
        EEPROM.write(i, wfn[i]);
      }
      EEPROM.write(wfn.length(), '\0');  // Null terminator for string

      // Write wfp to EEPROM starting from address after username
      int pwdStart = wfn.length() + 1;
      for (int i = 0; i < wfp.length(); i++) {
        EEPROM.write(pwdStart + i, wfp[i]);
      }
      EEPROM.write(pwdStart + wfp.length(), '\0');  // Null terminator for string

      EEPROM.commit();  // Ensure the data is written to EEPROM
      Serial.println("\n\n===========  [ Data written to EEPROM Success!! ]  ===========\n");
    }
    if(message.startsWith("ctrl/")){
      Serial.println("function control...");
    }
    if(message.startsWith("defaultwifi")){
        for (int i = 0; i < EEPROM_SIZE; i++) {
        EEPROM.write(i, 0);
        }
        EEPROM.commit(); 
        Serial.println("\n\n===========  [ EEPROM Cleared... ]  ===========\n");
    }
}

void loop() {
    client.loop();
}