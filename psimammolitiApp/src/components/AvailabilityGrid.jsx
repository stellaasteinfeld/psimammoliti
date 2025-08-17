import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { groupByDay } from "../utils/time";

export default function AvailabilityGrid({ availabilityIso = [], onPickSlot }) {
  const days = groupByDay(availabilityIso);

  if (!days.length) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="body1">No hay horarios disponibles esta semana.</Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {days.map(day => (
        <Grid key={day.key} item xs={12} sm={6} md={4}>
          <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{day.label}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {day.slots.map(s => (
                <Button
                  key={s.date.toISOString()}
                  size="small"
                  variant="outlined"
                  onClick={() => onPickSlot(s.date.toISOString())}
                >
                  {s.timeLabel}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
