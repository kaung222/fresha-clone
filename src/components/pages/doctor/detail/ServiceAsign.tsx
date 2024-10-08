"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Edit, Search } from "lucide-react";
import { useGetServices } from "@/api/service/get-service";
import { Service } from "@/types/service";
import { useParams } from "next/navigation";
import { useAssignServiceToDoctor } from "@/api/doctor/assign-service";

interface ServiceState {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  thumbnailUrl: string;
  duration: number;
  isPublished: boolean;
  status?: string;
}

type Props = {
  initialServices?: Service[];
};

export default function ServiceAssign({ initialServices = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<ServiceState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const { data: allServices } = useGetServices();
  const { doctorId } = useParams();
  const { mutate } = useAssignServiceToDoctor(String(doctorId));

  useEffect(() => {
    if (allServices) {
      setServices(
        allServices?.records?.map((service) => ({
          ...service,
          status: initialServices
            .map((doctorService) => doctorService.id)
            .includes(service.id)
            ? "assigned"
            : "unselected",
        }))
      );
    }
  }, [allServices, initialServices]);
  console.log(services);

  const handleServiceToggle = (serviceId: string) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status:
                service.status === "unselected"
                  ? "selected"
                  : service.status === "selected"
                  ? "unselected"
                  : "unselected", // If it was 'assigned', change to 'unselected'
            }
          : service
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    const assignedServices = services
      .filter(
        (service) =>
          service.status === "assigned" || service.status === "selected"
      )
      .map((service) => service.id);
    console.log("Updated assigned services:", assignedServices);
    mutate(
      { serviceIds: assignedServices },
      {
        onSuccess: () => {
          setOpen(false);
          setHasChanges(false);
        },
      }
    );
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Manage Services
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Manage Assigned Services</DialogTitle>
          <DialogDescription>
            Review and modify the services assigned to this doctor. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="search-services" className="sr-only">
            Search services
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services..."
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px] pr-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={`service-${service.id}`}
                checked={service.status !== "unselected"}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <label
                htmlFor={`service-${service.id}`}
                className="flex-grow text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between"
              >
                <span>{service.name}</span>
                {service.status === "assigned" && (
                  <Badge variant="secondary">Assigned</Badge>
                )}
                {service.status === "selected" && (
                  <Badge variant="default">New</Badge>
                )}
              </label>
            </div>
          ))}
        </ScrollArea>
        <DialogFooter className="sm:justify-between">
          {hasChanges && (
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span className="text-sm">Unsaved changes</span>
            </div>
          )}
          <Button onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
