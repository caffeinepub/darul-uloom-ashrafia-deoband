import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Video } from "lucide-react";
import { useState } from "react";

interface LiveClassroomModalProps {
  open: boolean;
  onClose: () => void;
  course: { id: bigint; title: string; instructor: string } | null;
  studentName?: string;
}

export default function LiveClassroomModal({
  open,
  onClose,
  course,
  studentName: initialStudentName,
}: LiveClassroomModalProps) {
  const [name, setName] = useState(initialStudentName ?? "");
  const [joined, setJoined] = useState(false);

  const roomName = course ? `AshrafiaClass-${course.id}` : "";
  const jitsiUrl = course
    ? `https://meet.jit.si/${roomName}#userInfo.displayName=${encodeURIComponent(name || "طالب علم")}&config.prejoinPageEnabled=false`
    : "";

  const handleClose = () => {
    setJoined(false);
    setName(initialStudentName ?? "");
    onClose();
  };

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="max-w-4xl w-full p-0 overflow-hidden"
        data-ocid="live-classroom.dialog"
        dir="rtl"
      >
        <DialogHeader className="bg-green-dark px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Video className="h-5 w-5 text-gold" />
              </div>
              <div>
                <DialogTitle className="font-display text-white text-lg leading-tight">
                  {course.title}
                </DialogTitle>
                <p className="text-white/70 text-sm">{course.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-red-500/20 text-red-300 text-xs px-2.5 py-1 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                لائیو
              </span>
            </div>
          </div>
        </DialogHeader>

        {!joined ? (
          <div className="p-8 flex flex-col items-center justify-center gap-6 min-h-[420px]">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-green-dark/10 flex items-center justify-center mx-auto mb-4">
                <Video className="h-10 w-10 text-green-dark" />
              </div>
              <h3 className="font-display text-xl font-bold text-green-dark">
                لائیو کلاس میں شامل ہوں
              </h3>
              <p className="text-muted-foreground text-sm">
                روم:{" "}
                <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">
                  {roomName}
                </code>
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <Label htmlFor="student-name" className="text-right block">
                آپ کا نام
              </Label>
              <Input
                id="student-name"
                data-ocid="live-classroom.input"
                dir="rtl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اپنا نام درج کریں"
                className="text-right"
              />
            </div>

            <Button
              data-ocid="live-classroom.primary_button"
              size="lg"
              className="bg-green-dark hover:bg-green-dark/90 text-white gap-2 px-8"
              onClick={() => setJoined(true)}
            >
              <Video className="h-4 w-4" />
              کلاس میں شامل ہوں
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div
              className="relative"
              style={{ height: "60vh", minHeight: 480 }}
            >
              <iframe
                src={jitsiUrl}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                style={{ width: "100%", height: "100%", border: "none" }}
                title={`Live Class: ${course.title}`}
              />
            </div>
            <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
              <p className="text-sm text-muted-foreground">
                طالب علم:{" "}
                <span className="font-medium text-foreground">
                  {name || "طالب علم"}
                </span>
              </p>
              <Button
                data-ocid="live-classroom.close_button"
                variant="destructive"
                size="sm"
                onClick={handleClose}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                کلاس چھوڑیں
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
