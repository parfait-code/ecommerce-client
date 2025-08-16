"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import {
    Card,
    CardBody,
    Chip,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { Package, Eye, Download, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Order } from "../../../src/types/user";

export default function OrdersPage() {
    const { orders } = useSelector((state: RootState) => state.auth);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(orders.length / rowsPerPage);
    const items = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "delivered":
                return "success";
            case "shipped":
                return "primary";
            case "processing":
                return "warning";
            case "cancelled":
                return "danger";
            default:
                return "default";
        }
    };

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        onOpen();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">My Orders</h1>
                <Chip variant="flat">{orders.length} Total Orders</Chip>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-12">
                        <Package
                            className="mx-auto mb-4 text-gray-400"
                            size={48}
                        />
                        <h3 className="text-lg font-medium mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            When you place your first order, it will appear here
                        </p>
                        <Button color="primary" href="/">
                            Start Shopping
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <>
                    <Card>
                        <CardBody className="p-0">
                            <Table aria-label="Orders table">
                                <TableHeader>
                                    <TableColumn>ORDER NUMBER</TableColumn>
                                    <TableColumn>DATE</TableColumn>
                                    <TableColumn>STATUS</TableColumn>
                                    <TableColumn>TOTAL</TableColumn>
                                    <TableColumn>ACTIONS</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {items.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">
                                                {order.orderNumber}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    color={getStatusColor(
                                                        order.status
                                                    )}
                                                    variant="flat"
                                                    size="sm"
                                                >
                                                    {order.status.toUpperCase()}
                                                </Chip>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                ${order.total.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() =>
                                                            handleViewOrder(
                                                                order
                                                            )
                                                        }
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                    >
                                                        <Download size={16} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>

                    {pages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                total={pages}
                                page={page}
                                onChange={setPage}
                            />
                        </div>
                    )}
                </>
            )}

            {/* Order Details Modal */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="3xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Order {selectedOrder?.orderNumber}
                                <span className="text-sm font-normal text-gray-600">
                                    Placed on{" "}
                                    {selectedOrder &&
                                        new Date(
                                            selectedOrder.createdAt
                                        ).toLocaleDateString()}
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                {selectedOrder && (
                                    <div className="space-y-6">
                                        {/* Order Status */}
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Status
                                                </p>
                                                <Chip
                                                    color={getStatusColor(
                                                        selectedOrder.status
                                                    )}
                                                    variant="flat"
                                                    className="mt-1"
                                                >
                                                    {selectedOrder.status.toUpperCase()}
                                                </Chip>
                                            </div>
                                            {selectedOrder.trackingNumber && (
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Tracking Number
                                                    </p>
                                                    <p className="font-medium">
                                                        {
                                                            selectedOrder.trackingNumber
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {selectedOrder.estimatedDelivery && (
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Estimated Delivery
                                                    </p>
                                                    <p className="font-medium">
                                                        {new Date(
                                                            selectedOrder.estimatedDelivery
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <h3 className="font-semibold mb-3">
                                                Order Items
                                            </h3>
                                            <div className="space-y-3">
                                                {selectedOrder.items.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-4 p-3 border rounded-lg"
                                                        >
                                                            <div className="w-20 h-24 bg-gray-200 rounded" />
                                                            <div className="flex-1">
                                                                <p className="font-medium">
                                                                    {
                                                                        item.productName
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Size:{" "}
                                                                    {item.size}{" "}
                                                                    | Color:{" "}
                                                                    {item.color}
                                                                </p>
                                                                <p className="text-sm">
                                                                    Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }{" "}
                                                                    × $
                                                                    {item.price}
                                                                </p>
                                                            </div>
                                                            <p className="font-semibold">
                                                                $
                                                                {(
                                                                    item.quantity *
                                                                    item.price
                                                                ).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="border-t pt-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Subtotal</span>
                                                    <span>
                                                        $
                                                        {selectedOrder.subtotal.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Shipping</span>
                                                    <span>
                                                        $
                                                        {selectedOrder.shipping.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Tax</span>
                                                    <span>
                                                        $
                                                        {selectedOrder.tax.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                                    <span>Total</span>
                                                    <span>
                                                        $
                                                        {selectedOrder.total.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    endContent={<ChevronRight size={16} />}
                                >
                                    Track Order
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
