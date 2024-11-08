import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {X} from "lucide-react";

// 多选框

const MultiSelect1 = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (option) => {
        const newValue = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option]
        onChange(newValue)
    }

    return (
        <div className="relative">
            <div
                className="flex flex-wrap gap-1 p-2 border rounded-md cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value.length > 0 ? (
                    value.map(item => (
                        <Badge key={item} variant="secondary" className="mr-1">
                            {item}
                            <X
                                className="ml-1 h-3 w-3 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleSelect(item)
                                }}
                            />
                        </Badge>
                    ))
                ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                )}
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    {options.map(option => (
                        <div
                            key={option}
                            className={`p-2 cursor-pointer hover:bg-accent ${value.includes(option) ? 'bg-accent' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default MultiSelect1;
