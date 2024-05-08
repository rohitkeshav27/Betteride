import { useState } from "react";
import { ProjectManager } from "@/hooks/useProjectManager";
import { useGlobalState } from "@/states";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function NewFileDialog({
  manager,
  project,
}: {
  manager: ProjectManager;
  project: string;
}) {
  const globalState = useGlobalState();

  const [newFileName, setNewFileName] = useState("");

  function newFile() {
    const proj = manager.getProject(project);
    const newFilenameFixed =
      newFileName.split(".").length > 1
        ? newFileName
        : newFileName + (globalState.activeMode == "AO" ? ".lua" : ".js");
    manager.newFile(proj, {
      name: newFilenameFixed,
      type: proj.defaultFiletype,
      initialContent: "ok",
    });
    globalState.setActiveFile(newFilenameFixed);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="rounded-sm py-1 px-2 h-6 justify-start w-full"
        >
          + new file
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new file</DialogTitle>
          <DialogDescription>
            Enter the name of the file you want to create.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="File Name"
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <Button onClick={() => newFile()}>Create File</Button>
      </DialogContent>
    </Dialog>
  );
}
