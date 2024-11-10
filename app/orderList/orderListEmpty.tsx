'use client'

import Link from 'next/link'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {PackageIcon, ShoppingBag} from 'lucide-react'
export default function OrderListEmpty() {
    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Order List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <PackageIcon className="mx-auto h-12 w-12 text-gray-400"/>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/interviewerList">
                                    <ShoppingBag className="mr-2 h-4 w-4"/>
                                    Start Shopping
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}