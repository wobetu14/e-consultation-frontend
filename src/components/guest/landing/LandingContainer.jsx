import React from 'react'
import ConsultationHero from './HeroSection'
import StatsDashboard from './StatsDashboard'
import { Box, Grid } from '@mui/material';
import AboutSection from "./AboutSection";
import HowToSection from './HowToSection';
import Footer from '../../../../src/partials/Footer'
import RecentDocs from './RecentDocs'

const LandingContainer = () => {
  return (
    <div>
      <ConsultationHero />
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ backgroundColor: "#fff", paddingBottom: "50px" }}
      >
        <Grid item xs={1} sm={2} md={2}></Grid>

        <Grid item xs={2} sm={4} md={8} >
          <StatsDashboard />
        </Grid>

        <Grid item xs={1} sm={2} md={2}></Grid>
      </Grid>

      <AboutSection />

      <HowToSection />

      <RecentDocs />

      <Footer />
    </div>
  );
}

export default LandingContainer