"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  Languages,
  Clock3,
  Edit,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailDoctor } from "@/api/doctor/get-doctor-detail";
import { useParams, useRouter } from "next/navigation";
import ServiceAssign from "./detail/ServiceAsign";
import DoctorTimetable from "./timetable/TimeTableAssign";
import CircleLoading from "@/components/layout/circle-loading";
import ErrorPage from "@/components/layout/DataErrorPage";


export default function DoctorDetailsPage() {
  const [isEditingServices, setIsEditingServices] = useState(false);
  const { doctorId } = useParams();
  const { data, isLoading } = useGetDetailDoctor();
  const router = useRouter();

  const handleEditServices = () => {
    setIsEditingServices(true);
    // In a real application, this would open a modal or navigate to an edit page
    console.log("Editing services");
  };

  if (isLoading) {
    return (
      <>
        <CircleLoading />
      </>
    )
  }

  return (
    <>
      {data ? (
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Image
                src={data.profilePictureUrl}
                alt={data.name}
                width={200}
                height={200}
                className="rounded-full"
              />
              <div className="text-center sm:text-left">
                <CardTitle className="text-3xl font-bold">
                  {data.name}
                </CardTitle>
                <CardDescription className="text-xl">
                  {data.speciality.engName} ({data.speciality.burmaName})
                </CardDescription>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">
                    {data.averageRating}
                  </span>
                  {/* <span className="ml-2 text-muted-foreground">
                    ({doctorData.totalReviews} reviews)
                  </span> */}
                </div>
                <Badge variant="secondary" className="mt-2">
                  {data.experience} years experience
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{data.clinic?.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={`tel:${data.phone}`}
                      className="text-primary hover:underline"
                    >
                      {data.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-primary hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <span>{Array(data.languageProficiency).map((language) => language)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">License</h3>
                  <p className="text-muted-foreground">{data.licenseNumber}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* <h3 className="text-xl font-semibold mb-4">
                    Education & Certifications
                  </h3> */}
                  {/* <ul className="space-y-2">
                    {doctorData.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-primary mr-2 mt-1" />
                        <div>
                          <p className="font-semibold">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution}, {edu.year}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul> */}
                  <h4 className="text-lg font-semibold mt-4 mb-2">
                    Certifications
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {data?.qualifications?.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {/* <h3 className="text-xl font-semibold mb-4">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{doctorData.availableDays.join(", ")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{doctorData.availableHours}</span>
                    </div>
                  </div> */}
                  <h4 className="text-lg font-semibold mt-4 mb-2">
                    Consultation Fee
                  </h4>
                  <p className="text-xl font-bold text-primary">
                    ${data.consultationFees ? data.consultationFees : "unavailable"}
                  </p>
                  {/* <Button className="w-full mt-4">Book Appointment</Button> */}
                </div>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="timetable">Timetable</TabsTrigger>
                </TabsList>
                <TabsContent value="services">
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-semibold">
                        Services Offered
                      </h3>
                      <ServiceAssign initialServices={data.services} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data?.services?.map((service, index) => (
                        <Card key={index} className="flex flex-col">
                          <Image
                            src={service.thumbnailUrl}
                            alt={service.name}
                            width={300}
                            height={200}
                            className="object-cover h-48 w-full rounded-t-lg"
                          />
                          <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription className=" line-clamp-4 ">
                              {service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-lg">
                                ${service.price}
                              </span>
                              <div className="flex items-center text-muted-foreground">
                                <Clock3 className="w-4 h-4 mr-1" />
                                <span>{service.duration} min</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={data.clinic?.profilePictureUrl}
                                  alt="Clinic"
                                />
                                <AvatarFallback>CL</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                Provided at clinic
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => router.push(`/services/${service.id}`)}>View Detail</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="timetable">
                  <DoctorTimetable />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
