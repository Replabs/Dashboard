import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export type PopupConfig = {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
};

/**
 * A simple popup.
 */
function Popup(props: { config: PopupConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.config.open);
  }, [props.config.open]);

  return (
    <Dialog
      open={isOpen}
      onClose={props.config.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.config.title}</DialogTitle>
      <DialogContent>
        {props.config.content
          .split("\n")
          .map((line, i) =>
            line == "" ? (
              <br />
            ) : (
              <DialogContentText id={`alert-dialog-description-${i}`}>
                {line}
              </DialogContentText>
            )
          )}
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
