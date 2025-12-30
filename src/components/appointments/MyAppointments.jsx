import { useState } from "react";
import { Calendar, Clock, Video, MapPin, User, X } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";
import { toast } from "sonner";

const MyAppointments = ({ appointments, onCancelAppointment }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCancelClick = (apt) => {
    setSelectedAppointment(apt);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment && onCancelAppointment) {
      onCancelAppointment(selectedAppointment.id);
      toast.success("Appointment cancelled successfully.");
    }
    setCancelDialogOpen(false);
    setSelectedAppointment(null);
  };

  if (appointments.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-elevated border border-border/50 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Upcoming Appointments</h3>
          <p className="text-muted-foreground mb-4">
            No upcoming appointments found. Please book a new appointment.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-medium bg-primary-light text-primary px-2 py-1 rounded-full">
                      {apt.id}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      apt.status === "Scheduled" 
                        ? "bg-green-100 text-green-700"
                        : apt.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{apt.doctorName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{apt.specialization}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{formatDate(apt.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm pl-6">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{apt.appointmentTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:border-l lg:border-border lg:pl-4 flex flex-col sm:flex-row lg:flex-col gap-2">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    apt.consultationMode === "virtual"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {apt.consultationMode === "virtual" ? (
                      <>
                        <Video className="w-4 h-4" />
                        <span className="text-sm font-medium">Virtual</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">In-Person</span>
                      </>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelClick(apt)}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyAppointments;