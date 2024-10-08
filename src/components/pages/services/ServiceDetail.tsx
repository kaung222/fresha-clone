"use client";
import { useDeleteService } from "@/api/service/delete-service";
import { useGetDetailService } from "@/api/service/get-service-detail";
import { usePublishService } from "@/api/service/publish-service";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, DollarSign, Tag } from "lucide-react"
import ErrorPage from "@/components/layout/DataErrorPage";
import CircleLoading from "@/components/layout/circle-loading";

type Props = {};

const ServiceDetail = (props: Props) => {
  const { serviceId } = useParams();
  const { data: service, isLoading } = useGetDetailService(String(serviceId));
  const { mutate } = useDeleteService();
  const publishService = usePublishService();
  const handleDeleteService = () => {
    if (service) {
      mutate({ id: service.id });
    }
  };
  const handlePublish = (id: string) => {
    publishService.mutate({ id });
  };
  return (
    <>
      {isLoading ? (
        <div>
          <CircleLoading />
        </div>
      ) : service ? (
        <div className="container mx-auto px-4 py-8">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <Image
                  src={service.thumbnailUrl}
                  alt={service.name}
                  width={500}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
                {service.isPublished && (
                  <Badge className="absolute top-4 left-4 bg-green-500">Published</Badge>
                )}
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl font-bold mb-2">{service.name}</CardTitle>
                  <CardDescription className="text-lg">{service.description}</CardDescription>
                </CardHeader>
                <Separator className="my-4" />
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {/* <DollarSign className="h-5 w-5 text-muted-foreground" /> */}
                      <span className="text-2xl font-semibold">Ks {service.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="p-0 pt-4">
                  <Button disabled={service.isPublished} onClick={() => handlePublish(service.id)} className="w-full">{service.isPublished ? "Published" : "Publish"}</Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <ErrorPage />
      )}

    </>
  );
};

export default ServiceDetail;
