import { ToggleButton, ToggleButtonGroup, Typography, Box } from "@mui/material";

export default function ModalityFilter({ value, onChange }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Filtrar por modalidad</Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, v) => onChange(v ?? "all")}
        size="small"
        color="primary"
      >
        <ToggleButton value="all">Todas</ToggleButton>
        <ToggleButton value="online">Online</ToggleButton>
        <ToggleButton value="presencial">Presencial</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
