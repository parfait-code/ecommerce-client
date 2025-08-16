"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../src/store/store";
import { deleteAddress } from "../../../src/store/slices/authSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { Address } from "../../../src/types/user";
import { useState } from "react";

export default function AddressesPage() {
    const dispatch = useDispatch();
    const { addresses } = useSelector((state: RootState) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this address?")) {
            dispatch(deleteAddress(id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">My Addresses</h1>
                <Button
                    color="primary"
                    startContent={<Plus size={18} />}
                    onClick={onOpen}
                >
                    Add New Address
                </Button>
            </div>

            {addresses.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-12">
                        <MapPin
                            className="mx-auto mb-4 text-gray-400"
                            size={48}
                        />
                        <h3 className="text-lg font-medium mb-2">
                            No addresses saved
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Add your shipping and billing addresses for faster
                            checkout
                        </p>
                        <Button color="primary" onClick={onOpen}>
                            Add Address
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <Card key={address.id}>
                            <CardHeader className="flex justify-between items-start">
                                <div className="flex gap-2">
                                    <Chip size="sm" variant="flat">
                                        {address.type.toUpperCase()}
                                    </Chip>
                                    {address.isDefault && (
                                        <Chip
                                            size="sm"
                                            color="primary"
                                            variant="flat"
                                        >
                                            DEFAULT
                                        </Chip>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                    {/* Add/Edit Address Modal */}
                    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader>
                                        {selectedAddress
                                            ? "Edit Address"
                                            : "Add New Address"}
                                    </ModalHeader>
                                    <ModalBody>
                                        {/* Address form would go here */}
                                        <p>Address form implementation</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            variant="light"
                                            onPress={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            color="primary"
                                            onPress={onClose}
                                        >
                                            {selectedAddress ? "Update" : "Add"}{" "}
                                            Address
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            )}
        </div>
    );
}
