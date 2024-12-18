import React, { useEffect, useRef, useState } from "react";

import {
	SelectContainer,
	SelectedValue,
	Dropdown,
	Option,
	DropdownArrow,
} from "./Select.styles";

/*
Farmat like this:
[
    {
        value: 0,
        label: "option 1"
    },
    {
        value: 1,
        label: "option 2"
    }
]
*/
interface OptionProps {
	value: string | number;
	label: string;
}

type Props = {
	options: OptionProps[];
	placeholder?: string;
	margin?: boolean;
	fontSize?: number;
	onChange?: (value: string | number) => void;
};

const Select: React.FC<Props> = ({
	options,
	placeholder = "Select an option.",
	margin = true,
	fontSize = 0,
	onChange = () => {},
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | number | null>(
		null
	);
	const selectRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (value: string | number) => {
		setSelectedValue(value);
		onChange(value);
		setIsOpen(false);
	};

	useEffect(() => {
		const outsideClick = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", outsideClick);

		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, [selectRef]);

	return (
		<SelectContainer ref={selectRef} $margin={margin} fontSize={fontSize}>
			<SelectedValue onClick={toggleDropdown}>
				{selectedValue
					? options.find((option) => option.value === selectedValue)
							?.label
					: placeholder}
				<DropdownArrow $isOpen={isOpen} />
			</SelectedValue>
			<Dropdown $isOpen={isOpen}>
				{options.map((option) => (
					<Option
						key={option.value}
						onClick={() => handleSelect(option.value)}
					>
						{option.label}
					</Option>
				))}
			</Dropdown>
		</SelectContainer>
	);
};

export default Select;
