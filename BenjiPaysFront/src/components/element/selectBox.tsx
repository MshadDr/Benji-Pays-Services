import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components";

interface SelectItemType {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    selectItems: SelectItemType[];
}

const SelectBox: React.FC<SelectProps> = ({ value, onValueChange, selectItems }) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full h-[42px] border border-gray-300 rounded px-3 text-base focus:ring-0 focus:border-gray-400 bg-white">
                <SelectValue placeholder={value.charAt(0).toUpperCase() + value.slice(1)} />
            </SelectTrigger>
            <SelectContent>
                {selectItems.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectBox;
