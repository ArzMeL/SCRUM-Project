import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import ruLocale from "date-fns/locale/ru";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
  Button,
  createTheme,
  FormControl,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@mui/material";

import { Box } from "@mui/system";
import { useState } from "react";
import "./form.scss";

const theme = createTheme({
  palette: {
    background: {
      primary: "#e3f2fd",
      paper: "rgba(255, 255, 255, 0.8)",
      box: "rgba(255, 255, 255, 0.2)",
      back: "#fff",
      purple: "#b91bf8",
    },
    text: {
      primary: "#546e7a",
    },
  },
});

const localeMap = {
  ru: ruLocale,
};

const maskMap = {
  ru: "__.__.____",
};

const initialState = {
  city: "Москва",
  checkIn: new Date(),
  checkOut: new Date(),
  guest: "1",
};

export const Form = ({ onSubmit }) => {
  const [infoForm, setInfoForm] = useState(initialState);

  const handleClick = () => {
    onSubmit(infoForm);
  };

  const handleCityChange = (e) => {
    setInfoForm((prevSetInfoForm) => ({
      ...prevSetInfoForm,
      city: e.target.value,
    }));
  };

  const handleGuestChange = (e) => {
    setInfoForm((prevSetInfoForm) => ({
      ...prevSetInfoForm,
      guest: e.target.value,
    }));
  };

  const handleCheckIn = (newDate) => {
    setInfoForm((prevSetInfoForm) => ({
      ...prevSetInfoForm,
      checkIn: +newDate,
    }));
  };

  const handleCheckOut = (newDate) => {
    setInfoForm((prevSetInfoForm) => ({
      ...prevSetInfoForm,
      checkOut: +newDate,
    }));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className="form"
          component="form"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            p: 5,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Направление"
            variant="filled"
            value={infoForm.city}
            onChange={handleCityChange}
            InputProps={{ disableUnderline: true }}
            sx={{
              mr: 6,
              bgcolor: "background.back",
              borderRadius: 3,
            }}
          />
          <LocalizationProvider
            dateAdapter={DateAdapter}
            locale={localeMap["ru"]}
          >
            <DesktopDatePicker
              label="Заезд"
              mask={maskMap.ru}
              inputFormat="dd.MM.yyyy"
              value={infoForm.checkIn}
              onChange={handleCheckIn}
              InputProps={{ disableUnderline: true }}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  sx={{
                    width: 180,
                    mr: 1,
                    bgcolor: "background.back",
                    borderRadius: 3,
                  }}
                  {...params}
                />
              )}
            />
            <DesktopDatePicker
              label="Выезд"
              mask={maskMap.ru}
              inputFormat="dd.MM.yyyy"
              value={infoForm.checkOut}
              onChange={handleCheckOut}
              InputProps={{ disableUnderline: true }}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  sx={{
                    width: 180,
                    mr: 6,
                    bgcolor: "background.back",
                    borderRadius: 3,
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl
            sx={{
              width: 150,
              mr: 1,
              bgcolor: "background.back",
              borderRadius: 3,
            }}
          >
            <TextField
              sx={{}}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              id="select"
              label="Кол-во гостей"
              value={infoForm.guest}
              onChange={handleGuestChange}
              select
            >
              <MenuItem sx={{ boxShadow: 1 }} value={1}>
                1 Гость
              </MenuItem>
              <MenuItem sx={{ boxShadow: 1 }} value={2}>
                2 Гостя
              </MenuItem>
              <MenuItem sx={{ boxShadow: 1 }} value={3}>
                3 Гостя
              </MenuItem>
              <MenuItem sx={{ boxShadow: 1 }} value={4}>
                4 Гостя
              </MenuItem>
            </TextField>
          </FormControl>
          <Button
            color="secondary"
            sx={{ width: 200, borderRadius: 3, bgcolor: "background.purple" }}
            size="large"
            variant="contained"
            onClick={handleClick}
          >
            Найти
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};
