import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { tz, toLocal } from "../utils/time";

export default function ScheduleDialog({ open, onClose, onConfirm, psychologist, slotIso, modality }) {
  const local = slotIso ? toLocal(slotIso) : null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirmar sesión</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Psicólogo/a: <strong>{psychologist?.name}</strong><br/>
          Modalidad: <strong>{modality === "presencial" ? "Presencial" : "Online"}</strong><br/>
          Fecha y hora (tu zona): <strong>{local ? `${local.weekday}, ${local.date.toLocaleDateString()} ${local.timeLabel}` : "-"}</strong><br/>
          Zona horaria detectada: <strong>{tz}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onConfirm(slotIso)} disabled={!slotIso}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
