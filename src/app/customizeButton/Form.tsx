"use client";
import PressButton from "@/components/button/pressButton";
import ToggelButton from "@/components/button/toggleButton";
import ToggleRecieve from "@/components/button/toggleRecieve";
import RotateImage from "@/components/Effect/RotateImage";
import React, { useState } from "react";

type PopupProps = {
  setTogglePopUp: () => void;
  setButtons: React.Dispatch<React.SetStateAction<ButtonProps[]>>;
};

type ButtonProps = {
  id: number;
  buttonType: string;
  buttonCategory: string;
  buttonLabel: string;
  buttonCommand: string;
};

type CustomizeBtnType = {
  transmiter: {
    press: {
      label: string[];
    };
    toggle: {
      label: string[];
    };
    joy: {
      label: string[];
    };
  };
  reciever: {
    toggle: string[];
    slide: string[];
  };
};

export default function Form() {
  const [toggle_popUp, setTogglePopUp] = useState<boolean>(false);
  const [buttons, setButtons] = useState<ButtonProps[]>([]);

  return (
    <div className="w-full h-full grid place-items-center px-10 py-10 bg-gray-700">

    <div className="w-full">
        <RotateImage/>
    </div>
      <div className="my-10 mx-10 flex gap-20">
        <div>
          {buttons && buttons.length > 0 ? (
            <div className="px-10 w-[400px] border-dashed border-2 py-5  flex flex-wrap  gap-4">
              {buttons.map((item) => (
                <div>
                  {item.buttonType == "transmiter" ? (
                    <div>
                      {item.buttonCategory == "press" ? (
                        <PressButton
                          category={item.buttonCategory}
                          cmd={item.buttonCommand}
                          label={item.buttonLabel}
                          type={item.buttonType}
                        />
                      ) : (
                        <ToggelButton
                          category={item.buttonCategory}
                          cmd={item.buttonCommand}
                          label={item.buttonLabel}
                          type={item.buttonType}
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <ToggleRecieve
                        category={item.buttonCategory}
                        cmd={item.buttonCommand}
                        label={item.buttonLabel}
                        type={item.buttonType}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-10 w-[480px] text-white font-semibold border-dashed border-2 py-5  flex flex-wrap gap-2">
              <div className="border-white border-2 text-4xl px-6 pt-2 pb-4 grid place-items-center">
                +
              </div>
            </div>
          )}
        </div>

        <button
          className="px-10 py-2 text-lg font-semibold hover:opacity-65 h-fit rounded-md text-white bg-blue-600
            hover:scale-[102%]
            duration-500
            "
          onClick={() => setTogglePopUp(!toggle_popUp)}
        >
          Adding Button
        </button>
      </div>
      {toggle_popUp && (
        <PopUp
          setTogglePopUp={() => setTogglePopUp(!toggle_popUp)}
          setButtons={setButtons}
        />
      )}
    </div>
  );
}
const PopUp = ({ setTogglePopUp, setButtons }: PopupProps) => {
  const [buttonCategory, setButtonCategory] = React.useState<string>("");
  const [buttonLabel, setButtonLabel] = React.useState<string>("");
  const [buttonCommand, setButtonCommand] = React.useState<string>("");
  const [buttonType, setButtonType] = React.useState<string>("");

  const customizeBtn: CustomizeBtnType = {
    transmiter: {
      press: {
        label: ["Dot", "Up", "Down", "Left", "Right"],
      },
      toggle: {
        label: ["Forwar", "Backward", "Up", "Down", "Left", "Right"],
      },
      joy: { label: ["normol joy stick"] },
    },
    reciever: {
      toggle: ["On-Off", "2-step"],
      slide: ["1 level", "2 level", "3 level"],
    },
  };
  const [selectedType, setSelectedType] = useState<
    keyof CustomizeBtnType | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as keyof CustomizeBtnType);
    setButtonType(event.target.value as keyof CustomizeBtnType);
    setSelectedCategory(null);
    setSelectedLabel(null);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setButtonCategory(event.target.value);
    setSelectedLabel(null);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
    setButtonLabel(event.target.value);
  };

  const getCategoryOptions = (): string[] => {
    if (!selectedType) return [];
    return Object.keys(customizeBtn[selectedType]) as string[];
  };

  const getLabelOptions = (): string[] => {
    if (!selectedType || !selectedCategory) return [];
    const selectedData =
      customizeBtn[selectedType][
        selectedCategory as keyof (typeof customizeBtn)[selectedType]
      ];
    return Array.isArray(selectedData)
      ? selectedData
      : selectedData.label || [];
  };

  const handleSave = () => {
    const newButton: ButtonProps = {
      id: Date.now(),
      buttonType,
      buttonCategory,
      buttonLabel,
      buttonCommand,
    };
    setButtons((prevButtons) => [...prevButtons, newButton]);
    setTogglePopUp();
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30"
      onClick={setTogglePopUp}
    >
      <div
        className="z-100 w-2/5  rounded-md bg-gray-600 px-16 pt-10 pb-5 grid place-items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap my-2 gap-4">
          <select
            className="px-4 py-2 border rounded mb-4"
            value={selectedType || ""}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            {Object.keys(customizeBtn).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded mb-4"
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            disabled={!selectedType}
          >
            <option value="">Select Category</option>
            {getCategoryOptions().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded mb-4"
            value={selectedLabel || ""}
            onChange={handleLabelChange}
            disabled={!selectedCategory}
          >
            <option value="">Select Label</option>
            {getLabelOptions().map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div
          className={` ${
            selectedType == "transmiter" ? "" : "hidden"
          } flex my-2 w-full justify-start gap-2`}
        >
          <label className="text-white">Command: </label>
          <input
            type="text"
            className="py-1 w-[300px] rounded-md px-4"
            placeholder=">/"
            value={buttonCommand}
            onChange={(e) => setButtonCommand(e.target.value)}
          />
        </div>
        <div className="my-4 w-full grid place-items-center">
          <button
            className="px-10 py-2 bg-blue-600 rounded-md text-white hover:opacity-80"
            onClick={handleSave}
            disabled={
              !buttonCategory && !buttonLabel && !buttonCommand && !buttonType
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
