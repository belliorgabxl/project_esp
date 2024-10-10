#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// WiFi
const char *ssid = "Jordy";
const char *password = "12345678";

// MQTT Broker
const char *mqtt_broker = "4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud";
const char *topic = "esp32/car/control";
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

#define LED 23

WiFiClientSecure espClient;
PubSubClient client(espClient);
void reconnectWiFi() {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi disconnected. Attempting to reconnect...");
        digitalWrite(LED, LOW);  // LED ดับเมื่อไม่มีการเชื่อมต่อ WiFi
        WiFi.begin(ssid, password);
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
            digitalWrite(LED, LOW);  // LED ดับเมื่อกำลังเชื่อมต่อใหม่
        }
        Serial.println("Reconnected to WiFi!");
        digitalWrite(LED, HIGH);  // LED ติดเมื่อเชื่อมต่อ WiFi ได้
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(EN1,OUTPUT);
    pinMode(EN2,OUTPUT);
    pinMode(INP1,OUTPUT);
    pinMode(INP2,OUTPUT);
    pinMode(INP3,OUTPUT);
    pinMode(INP4,OUTPUT);
    pinMode(LED,OUTPUT);

    digitalWrite(EN1, HIGH);  // set full speed
    digitalWrite(EN2, HIGH); 

    // เชื่อมต่อกับ WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
        digitalWrite(LED,LOW);
    }
    Serial.println("Connected to the WiFi network");
    digitalWrite(LED,HIGH);

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

    // Subscribe หัวข้อที่ต้องการ
    client.subscribe(topic);

    //then 

    // client.publisher(///)
}

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message: ");
    String message;
    
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println(message);
    Serial.println("-----------------------");

    // ตรวจสอบคำสั่งจาก message ที่ส่งมา
    if (message == "forward") {
        // เดินหน้า
        digitalWrite(INP1, HIGH);
        digitalWrite(INP2, LOW);
        digitalWrite(INP3, HIGH);
        digitalWrite(INP4, LOW);
        Serial.println("Moving forward");
    } else if (message == "backward") {
        // ถอยหลัง
        digitalWrite(INP1, LOW);
        digitalWrite(INP2, HIGH);
        digitalWrite(INP3, LOW);
        digitalWrite(INP4, HIGH);
        Serial.println("Moving backward");
    } else if (message == "left") {
        // เลี้ยวซ้าย
        digitalWrite(INP1, LOW);
        digitalWrite(INP2, HIGH);  // ด้านซ้ายถอยหลัง
        digitalWrite(INP3, HIGH);
        digitalWrite(INP4, LOW);   // ด้านขวาเดินหน้า
        Serial.println("Turning left");
    } else if (message == "right") {
        // เลี้ยวขวา
        digitalWrite(INP1, HIGH);
        digitalWrite(INP2, LOW);   // ด้านซ้ายเดินหน้า
        digitalWrite(INP3, LOW);
        digitalWrite(INP4, HIGH);  // ด้านขวาถอยหลัง
        Serial.println("Turning right");
    } else if (message == "stop") {
        // หยุด
        digitalWrite(INP1, LOW);
        digitalWrite(INP2, LOW);
        digitalWrite(INP3, LOW);
        digitalWrite(INP4, LOW);
        Serial.println("Stop");
    }
}
void loop() {
    reconnectWiFi();
    client.loop();
}
