"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { Size } from "../../types";

interface SizeSelectorProps {
    sizes: Size[];
    selectedSize: string | null;
    onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
    sizes,
    selectedSize,
    onSizeSelect,
}) => {
    return (
        <div>
            <p className="text-sm font-medium mb-3">SELECT SIZE</p>
            <ButtonGroup className="flex-wrap gap-2">
                {sizes.map((size) => (
                    <Button
                        key={size.value}
                        variant={
                            selectedSize === size.value ? "solid" : "bordered"
                        }
                        isDisabled={!size.available}
                        onClick={() => onSizeSelect(size.value)}
                        radius="none"
                        size="sm"
                        className="min-w-[60px]"
                    >
                        {size.value}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default SizeSelector;
