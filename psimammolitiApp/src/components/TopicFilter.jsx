import { Box, Chip, Stack, Typography } from "@mui/material";

export default function TopicFilter({ topics, selected, onChange }) {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Filtrar por temática
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip
          label="Todas"
          color={!selected ? "primary" : "default"}
          onClick={() => onChange(null)}
          variant={!selected ? "filled" : "outlined"}
        />
        {topics.map(t => (
          <Chip
            key={t}
            label={t}
            onClick={() => onChange(selected === t ? null : t)}
            color={selected === t ? "primary" : "default"}
            variant={selected === t ? "filled" : "outlined"}
            sx={{ mt: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
