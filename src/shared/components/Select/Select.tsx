import { forwardRef, useEffect, useRef, useState } from "react";

import {
	SelectContainer,
	SelectedValue,
	Dropdown,
	Option,
	DropdownArrow,
} from "./Select.styles";

import Icon, { IconName } from "../Icon/Icon";

import { fontDisplayNames } from "src/shared/util/styles";

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
type OptionProps = {
	value: string | number;
	label: string;
	icon?: IconName;
};

type Props = {
	options: OptionProps[];
	placeholder?: string;
	margin?: boolean;
	fontSize?: number;
	onChange?: (value: string | number) => void;
	value?: string | number;
	error?: string;
};

const Select = forwardRef<HTMLDivElement, Props>(
	(
		{
			options,
			placeholder = "Select an option.",
			margin = true,
			fontSize = 0,
			onChange = () => {},
			value,
			error,
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [dropdownWidth, setDropdownWidth] = useState<number>(0);

		const selectRef = useRef<HTMLDivElement | null>(null);
		const valueRef = useRef<HTMLDivElement | null>(null);
		const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

		const toggleDropdown = () => setIsOpen(!isOpen);

		const handleSelect = (value: string | number) => {
			onChange(value);
			setIsOpen(false);
		};

		useEffect(() => {
			if (isOpen) {
				const calcWidth = () => {
					const items = optionRefs.current.map(
						(option) => option?.getBoundingClientRect().width || 0
					);
					if (valueRef.current) {
						items.push(
							valueRef.current.getBoundingClientRect().width
						);
					}

					const maxWidth = Math.max(...items);

					if (maxWidth >= dropdownWidth) {
						setDropdownWidth(maxWidth);
					}
				};
				calcWidth();
			}
		}, [isOpen, options, dropdownWidth]);

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

		const selectedOption = options.find((option) => option.value === value);

		return (
			<SelectContainer
				ref={(node) => {
					selectRef.current = node;
					if (typeof ref === "function") ref(node);
				}}
				$margin={margin}
				fontSize={fontSize}
			>
				<SelectedValue
					onClick={toggleDropdown}
					style={{
						width: dropdownWidth ? `${dropdownWidth}px` : "auto",
					}}
					ref={valueRef}
				>
					<div>
						{selectedOption?.icon && (
							<Icon icon={selectedOption.icon} right={true} />
						)}
						{selectedOption ? selectedOption.label : placeholder}
					</div>

					<DropdownArrow $isOpen={isOpen} />
				</SelectedValue>
				<Dropdown $isOpen={isOpen}>
					{options.map((option, index) => {
						const fontFamily = Object.values(
							fontDisplayNames
						).includes(option.label)
							? option.label
							: undefined;
						return (
							<Option
								key={option.value}
								onClick={() => handleSelect(option.value)}
								ref={(el) => (optionRefs.current[index] = el)}
								style={{ fontFamily }}
							>
								{option.icon ? (
									<Icon icon={option.icon} right={true} />
								) : null}
								{option.label}
							</Option>
						);
					})}
				</Dropdown>
			</SelectContainer>
		);
	}
);

export default Select;
