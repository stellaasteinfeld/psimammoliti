import { useState } from "react";
import {
  AppBar, Box, Container, Toolbar, Typography,
  Grid, Snackbar, Alert, Divider
} from "@mui/material";
import { psychologists, allTopics } from "../data/psychologists";
import TopicFilter from "../components/TopicFilter";
import PsychologistCard from "../components/PsychologistCard";
import AvailabilityGrid from "../components/AvailabilityGrid";
import ScheduleDialog from "../components/ScheduleDialog";
import { useAuth } from "../context";
import { tz } from "../utils/time";

export default function HomePage() {
  const { user, logout } = useAuth();

  const [topic, setTopic] = useState(null);
  const [selectedPsy, setSelectedPsy] = useState(null);
  const [scheduleDialog, setScheduleDialog] = useState({ open: false, slotIso: null });
  const [toast, setToast] = useState({ open: false, msg: "", sev: "success" });

  const [availabilityState, setAvailabilityState] = useState(() =>
    new Map(psychologists.map(p => [p.id, [...p.availability]]))
  );

  const filteredPsychos = !topic
    ? psychologists
    : psychologists.filter(p => p.topics.includes(topic));

  const currentAvailability = selectedPsy
    ? availabilityState.get(selectedPsy.id) ?? []
    : [];

  const pickSlot = (slotIso) => {
    setScheduleDialog({ open: true, slotIso });
  };

  const confirmSchedule = (slotIso) => {
    if (!selectedPsy) return;
    setAvailabilityState(prev => {
      const next = new Map(prev);
      const arr = [...(next.get(selectedPsy.id) ?? [])].filter(s => s !== slotIso);
      next.set(selectedPsy.id, arr);
      return next;
    });
    setScheduleDialog({ open: false, slotIso: null });
    setToast({
      open: true,
      sev: "success",
      msg: `Sesión agendada con ${selectedPsy.name}. (Online)`,
    });
  };

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PsicoOnline</Typography>
          <Typography variant="body2">{user?.email}</Typography>
          <Typography
            variant="body2"
            sx={{ ml: 2, display: { xs: "none", sm: "block" } }}
          >
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
          {/* Filtro */}
          <Grid item xs={12}>
            <TopicFilter topics={allTopics} selected={topic} onChange={setTopic} />
            <Typography variant="caption" color="text.secondary">
              *Las sesiones son online solamente.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Lista de psicólogos */}
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
              {selectedPsy ? `Disponibilidad de ${selectedPsy.name}` : "Seleccioná un profesional"}
            </Typography>
            <AvailabilityGrid availabilityIso={currentAvailability} onPickSlot={pickSlot} />
          </Grid>
        </Grid>
      </Container>

      <ScheduleDialog
        open={scheduleDialog.open}
        slotIso={scheduleDialog.slotIso}
        psychologist={selectedPsy}
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
