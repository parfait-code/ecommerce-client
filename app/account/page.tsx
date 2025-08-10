"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store/store";
import { updateUser } from "../../src/store/slices/authSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Avatar,
    Divider,
} from "@heroui/react";
import { useState } from "react";
import { User, Mail, Phone, Calendar, Camera } from "lucide-react";

export default function AccountPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        dateOfBirth: user?.dateOfBirth || "",
    });

    const handleSave = () => {
        dispatch(updateUser(formData));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            dateOfBirth: user?.dateOfBirth || "",
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">My Account</h1>
                    {!isEditing ? (
                        <Button
                            variant="bordered"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="light" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <Avatar
                                className="w-24 h-24"
                                name={`${user?.firstName} ${user?.lastName}`}
                                src="/avatar-placeholder.jpg"
                            />
                            {isEditing && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    className="absolute bottom-0 right-0"
                                    variant="solid"
                                >
                                    <Camera size={16} />
                                </Button>
                            )}
                        </div>
                        <h2 className="text-xl font-medium mt-4">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Member since{" "}
                            {new Date(
                                user?.createdAt || ""
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <Divider className="mb-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            startContent={
                                <User className="text-gray-400" size={18} />
                            }
                            isReadOnly={!isEditing}
                            variant={isEditing ? "bordered" : "flat"}
                        />

                        <Input
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            startContent={
                                <User className="text-gray-400" size={18} />
                            }
                            isReadOnly={!isEditing}
                            variant={isEditing ? "bordered" : "flat"}
                        />

                        <Input
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            startContent={
                                <Mail className="text-gray-400" size={18} />
                            }
                            isReadOnly={!isEditing}
                            variant={isEditing ? "bordered" : "flat"}
                        />

                        <Input
                            type="tel"
                            label="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            startContent={
                                <Phone className="text-gray-400" size={18} />
                            }
                            isReadOnly={!isEditing}
                            variant={isEditing ? "bordered" : "flat"}
                        />

                        <Input
                            type="date"
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dateOfBirth: e.target.value,
                                })
                            }
                            startContent={
                                <Calendar className="text-gray-400" size={18} />
                            }
                            isReadOnly={!isEditing}
                            variant={isEditing ? "bordered" : "flat"}
                        />
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Account Security</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Button variant="bordered" className="w-full md:w-auto">
                        Change Password
                    </Button>
                    <Button variant="bordered" className="w-full md:w-auto">
                        Enable Two-Factor Authentication
                    </Button>
                    <Button
                        variant="bordered"
                        color="danger"
                        className="w-full md:w-auto"
                    >
                        Delete Account
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
