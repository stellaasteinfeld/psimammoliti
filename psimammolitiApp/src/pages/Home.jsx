import { useState } from "react";
import {
  AppBar, Box, Container, Toolbar, Typography,
  Grid, Snackbar, Alert, Divider
} from "@mui/material";
import { psychologists, allTopics } from "../data/psychologists";
import TopicFilter from "../components/TopicFilter";
import ModalityFilter from "../components/ModalityFilter";
import PsychologistCard from "../components/PsychologistCard";
import AvailabilityGrid from "../components/AvailabilityGrid";
import ScheduleDialog from "../components/ScheduleDialog";
import { useAuth } from "../context";
import { tz } from "../utils/time";

export default function HomePage() {
  const { user, logout } = useAuth();

  const [topic, setTopic] = useState(null);
  const [modality, setModality] = useState("all");
  const [selectedPsy, setSelectedPsy] = useState(null);
  const [scheduleDialog, setScheduleDialog] = useState({ open: false, slotIso: null });
  const [toast, setToast] = useState({ open: false, msg: "", sev: "success" });

  const [availabilityState, setAvailabilityState] = useState(() =>
    new Map(
      psychologists.map(p => [
        p.id,
        {
          online: [...(p.availability.online ?? [])],
          presencial: [...(p.availability.presencial ?? [])],
        }
      ])
    )
  );

  const filteredPsychos = psychologists.filter(p => {
    const matchTopic = !topic || p.topics.includes(topic);
    if (modality === "all") return matchTopic;
    const hasSlots = (p.availability[modality]?.length ?? 0) > 0;
    return matchTopic && hasSlots;
  });

  const currentAvailability = selectedPsy
    ? (availabilityState.get(selectedPsy.id)?.[modality === "all" ? "online" : modality] ?? [])
    : [];

  const pickSlot = (slotIso) => {
    setScheduleDialog({ open: true, slotIso });
  };

  const confirmSchedule = (slotIso) => {
    if (!selectedPsy) return;
    const mode = modality === "all" ? "online" : modality;
    setAvailabilityState(prev => {
      const next = new Map(prev);
      const obj = { ...(next.get(selectedPsy.id) ?? { online: [], presencial: [] }) };
      obj[mode] = obj[mode].filter(s => s !== slotIso);
      next.set(selectedPsy.id, obj);
      return next;
    });
    setScheduleDialog({ open: false, slotIso: null });
    setToast({
      open: true,
      sev: "success",
      msg: `Sesión agendada con ${selectedPsy.name} (${mode}).`,
    });
  };

  const modalityLabel = modality === "all" ? "" : (modality === "presencial" ? "presencial" : "online");

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PsicoOnline</Typography>
          <Typography variant="body2">{user?.email}</Typography>
          <Typography variant="body2" sx={{ ml: 2, display: { xs: "none", sm: "block" } }}>
            Horarios en: {tz}
          </Typography>
          <Typography
            onClick={logout}
            role="button"
            tabIndex={0}
            sx={{ ml: 2, cursor: "pointer", textDecoration: "underline" }}
          >
            Cerrar sesión
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 3, sm: 4 }, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopicFilter topics={allTopics} selected={topic} onChange={setTopic} />
            <ModalityFilter value={modality} onChange={setModality} />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Psicólogos disponibles
            </Typography>
            <Grid container spacing={2}>
              {filteredPsychos.map(p => (
                <Grid key={p.id} item xs={12} sm={6}>
                  <PsychologistCard
                    psycho={p}
                    selected={selectedPsy?.id === p.id}
                    onSelect={setSelectedPsy}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {selectedPsy
                ? `Disponibilidad de ${selectedPsy.name}${modality !== "all" ? ` (${modalityLabel})` : ""}`
                : "Seleccioná un profesional"}
            </Typography>
            <AvailabilityGrid
              availabilityIso={currentAvailability}
              modalityLabel={modalityLabel}
              onPickSlot={pickSlot}
            />
          </Grid>
        </Grid>
      </Container>

      <ScheduleDialog
        open={scheduleDialog.open}
        slotIso={scheduleDialog.slotIso}
        psychologist={selectedPsy}
        modality={modality === "all" ? "online" : modality}
        onClose={() => setScheduleDialog({ open: false, slotIso: null })}
        onConfirm={confirmSchedule}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.sev}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
