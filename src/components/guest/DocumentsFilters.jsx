import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "../../axios/AxiosGlobal";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
/**
 * Create a DocumentsFilter functional component
 * and pass props from parent component called DocumentDisplay
 */
const DocumentsFilters = ({
  drafts,
  setDrafts,
  unfilteredDrafts,
  setUnfilteredDrafts,
  totalDrafts,
  setTotalDrafts,
  pageCount,
  setPageCount,
  loading,
  setLoading,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  /**
   * Declare variables to handle data related to
   * law categories. The lawCategoryID variable is used to handle ID of a selcted law category value by a user
   * as a filtering criteria.
   * The lawCategories variable is used to store list of law category values coming from API request result.
   * so that these values will be rendered with a dropdown box and allow user to select one as a filtering criterion.
   *
   */
  const [lawCategoryID, setLawCategoryID] = useState(0);
  const [lawCategories, setLawCategories] = useState(null);

  /**
   * As described above the regionID, regions, institutionID, institutions are also used
   * for the same purpose. i.e. to filter drafts based on region and institution
   */
  const [regionID, setRegionID] = useState(0);
  const [regions, setRegions] = useState(null);

  const [institutionID, setInstitutionID] = useState(0);
  const [institutions, setInstitutions] = useState(null);

  const [draftStatusName, setDraftStatusName] = useState("");

  /**
   * The sectors and selectedSectors variable is also used to handel data related to sectors
   * for the purpose of filtering draft based on list of sectors information.
   */
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);

  // useEffect to calculate dynamic page size for pagination
  useEffect(() => {
    setPageCount(Math.ceil(parseInt(totalDrafts) / 10));
  }, [drafts]);

  /**
   * Create useEffect hook to fetch list of law categories from the database upon page load,
   * and used for rendering
   * as Dropdown box labeling.
   */
  useEffect(() => {
    fetchLawCategories();
  }, []);

  /**
   * Function definition for fetchLawCategories() call inside the useEffect hook created above.
   * This function basically sends API request to fetch list of law categories.
   */
  const fetchLawCategories = async () => {
    return await axios
      .get("public/law-categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLawCategories(res.data.data.data);
      })
      .catch((error) => {});
  };

  /**
   * Create useEffect hook to fetch list of regions upon page load
   * and use it for rendering list of regions with a dropdown box
   */
  useEffect(() => {
    fetchRegions();
  }, []);

  /**
   * Function definition for fetchRegions() call inside the useEffect hook created above.
   * This function basically sends API request to fetch list of regions.
   */

  const fetchRegions = async () => {
    return await axios
      .get("public/regions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRegions(res.data.data.data);
      })
      .catch((error) => {});
  };

  /**
   * Create useEffect hook to fetch list of institutions upon page load and use it to render
   * list of institutions with a dropdown box. This code style works for sectors as well as
   * written below followed by this institutions snippet as well.
   */

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    return await axios
      .get("public/institutions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setInstitutions(res.data.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    return await axios
      .get("public/sectors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setSectors(res.data);
      })
      .catch((error) => {});
  };

  /**
   * Handle the value changes and send API requests based on the user triggering the onChnage event.
   * Here we have implemented to filter drafts based on the selected values by the user.
   * We have implemented this filtering mechanism for all criterias including regionChange,
   * institutionChange, lawCategoryChange, draft status change, sector name change etc.
   */

  const handleRegionChange = async (e) => {
    setRegionID(e.target.value);
    setLoading(true);
    return await axios
      .get(`drafts?region=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setDrafts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleInstitutionChange = async (event) => {
    event.preventDefault();
    setInstitutionID(event.target.value);
    setLoading(true);
    return await axios
      .get(`drafts?institution=${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setDrafts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setLawCategoryID(e.target.value);
    setLoading(true);
    return await axios
      .get(`drafts?law_category=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setDrafts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDraftStatusChange = async (e) => {
    e.preventDefault();
    setDraftStatusName(e.target.value);
    setLoading(true);
    return await axios
      .get(`drafts?draft_status=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setDrafts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    /**
     * Create UI form elements to allow user filter data basd on the given criterion.
     */
    <Paper
      elevation={1}
      sx={{ backgroundColor: colors.grey[200], padding: "15px" }}
    >
      {/* <form> */}
      <Box marginBottom="15px">
        <Typography variant="h6" fontWeight={600}>
          {t("category")}
        </Typography>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="lawCategoryID"
          value={lawCategoryID}
          onChange={handleCategoryChange}
        >
          {lawCategories
            ? lawCategories.map((lawCategory) => (
                <FormControlLabel
                  key={lawCategory.id}
                  value={lawCategory.id}
                  control={<Radio />}
                  label={lawCategory.name}
                />
              ))
            : null}
        </RadioGroup>
      </Box>

      <Box marginBottom="15px">
        <Typography variant="h6" fontWeight={600}>
          {t("filter_by_region_name")}
        </Typography>

        <div>
          <form>
            <FormControl sx={{ m: 1, minWidth: "80%" }}>
              <Select
                name="regionID"
                placeholder="Region"
                value={regionID}
                onChange={handleRegionChange}
                displayEmpty
                autoWidth="false"
                size="small"
              >
                {regions
                  ? regions.map((region) => (
                      <MenuItem key={region.id} value={region.id}>
                        {region.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </form>
        </div>
      </Box>

      <Box marginBottom="15px">
        <Typography variant="h6" fontWeight={600}>
          {t("institution_name")}
        </Typography>

        <div>
          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <Select
              name="institutionID"
              placeholder="Region"
              value={institutionID}
              onChange={handleInstitutionChange}
              displayEmpty
              autoWidth="false"
              size="small"
            >
              {institutions
                ? institutions.map((institution) => (
                    <MenuItem key={institution.id} value={institution.id}>
                      {institution.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </div>
      </Box>

      <Box marginBottom="15px">
        <Typography variant="h6" fontWeight={600}>
          {t("document_status")}
        </Typography>

        <RadioGroup
          aria-labelledby="draft-status-id"
          name="draftStatusName"
          value={draftStatusName}
          onChange={handleDraftStatusChange}
        >
          <FormControlLabel value="Open" control={<Radio />} label="Open" />
          <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
        </RadioGroup>
      </Box>

      <Box marginBottom="15px">
        <Typography variant="h6" fontWeight={600}>
          {t("economic_sector")}
        </Typography>

        <Autocomplete
          multiple
          id="tags-standard"
          autoSelect
          color="info"
          size="small"
          sx={{ paddingBottom: "10px" }}
          options={sectors}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => setSelectedSectors(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("sectors")}
              value={(option) => option.name}
            />
          )}
        />
      </Box>
    </Paper>
  );
};

export default DocumentsFilters;
