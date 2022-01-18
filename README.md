# Something's Fishy

Investigating the impact of human influence on aquatic ecosystems in the Gulf of Mexico. This project was created by Ben, Jose, Lauren, Lingtao, and TJ for [Hack the Map 5](https://hack-the-map-5.devpost.com/).

- [Something's Fishy](#somethings-fishy)
  - [The Problem](#the-problem)
  - [The Solutions](#the-solutions)
  - [Marine Debris](#marine-debris)
  - [Project Story](#project-story)
    - [Inspirations](#inspirations)
    - [What it does](#what-it-does)
    - [How we built it](#how-we-built-it)
    - [Challenges](#challenges)
    - [Accomplishments](#accomplishments)
    - [What we learned](#what-we-learned)
    - [Next steps](#next-steps)
  - [Mapping data sources](#mapping-data-sources)
  - [Run the app locally](#run-the-app-locally)
  - [Built with](#built-with)

## The Problem

- Global warming may reduce fish and other sea life by 17% by the year 2100. [source](https://www.pnas.org/content/116/26/12907.short?rss=1)
- Over the last decade, the rate of plastic consumption [by fish] has doubled, increasing by 2.4 percent every year. [source](https://news.stanford.edu/2021/02/09/plastic-ingestion-fish-growing-problem/)
- 386 marine fish species are known to have ingested plastic debris, including 210 species that are commercially important. [source](https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.15533)
- Ocean pollution is a widespread, worsening, and poorly controlled problem that is directly affecting human and ecosystem health. [source](https://www.niehs.nih.gov/research/programs/geh/geh_newsletter/2021/2/articles/new_study_finds_ocean_pollution_a_threat_to_human_health.cfm")

## The Solutions

- Buy local, sustainable fish when possible. [source](https://www.seafoodwatch.org/recommendations/search?query=)
- Carry a reusable bottle instead of buying single-use plastics. [source](https://blogs.nicholas.duke.edu/env212/single-use-plastic-and-its-effects-on-our-oceans)
- Ask your representatives to create and fund more Marine Protected Areas to save endangered aquatic ecosystems. [source](https://www.americanprogress.org/article/marine-protected-areas-help-fisheries-ocean-ecosystems/)
- Volunteer your time to pickup trash at a local beach (more info below). [source](https://oceanconservancy.org/trash-free-seas/)

## Marine Debris

If you see something, pick it up and/or let others know!

According to National Ocean Service, marine debris is defined as any persistent solid material that is manufactured or processed and directly or indirectly, intentionally or unintentionally, disposed of or abandoned into the marine environment or the Great Lakes. There is no part of the world left untouched by debris and its impacts. It is one of the most widespread pollution problems facing the world's ocean and waterways. [source](https://oceanservice.noaa.gov/hazards/marinedebris/)

The mapping application shows marine debris data points that we collected via ArcGIS Survey123. Click on the points to see further details (debris type, photo, etc.) in a pop-up. Click on other places on the map to see demographic data of the area (if they are available).

Access the survey with this [link](https://survey123.arcgis.com/share/db45322af45e4fd6a86d38331d2e3498), this [shortened link](https://arcg.is/1T8nfr0), or scan this [QR code](https://github.com/benelan/somethings-fishy/blob/master/public/img/survey_QR_code.png) with your phone!

## Project Story

Information prompted by the hackathon submission form.

### Inspirations

- Conserve and sustainably use the oceans, seas and marine resources for sustainable development. [source](https://sdgs.un.org/goals/goal14)

- Recent news and events on climate change such as the recent Tongan Volcano eruption, Kentucky tornados, the Colorado wildfires, and east coast flooding.

### What it does

- Investigates the impact of human influence on aquatic ecosystems in the Gulf of Mexico.

- Shows spatial analysis results of how much area has been marked as protected in relation to the species rarity score.

- Collects marine debris locations and details from the public; maps the debris records with demographic data and generates routes from end-users' location to the location of the debris records.

- Includes an interactive experience with an application that allows users to use a scientific formula to measure species diversity (Shannon-Wiener Index). It educates on biodiversity, its importance, and the human impact from recent studies.

- Allows visualization of Sea Surface Temperature over the last decade.

### How we built it

- Used ArcGIS Platform location services to analyze data collected from ArcGIS Online and federal agency websites.

- Created the marine debris survey using ArcGIS Survey123

- Utilized the ArcGIS API for JavaScript to create interactive mapping applications and styled them with the Calcite Design System.

- Split up the project into different parts and used Git/Github to collaborate.

### Challenges

- During spatial analysis data creation, we ran into a bug that would not allow running a spatial analysis tool more than two times. To overcome this, we used another developer account to run the analysis task.

- Styling some of the components of the application was challenging at times.

- Formatting requests with Postman and the Spatial Analysis services.

- Securing the API key on a public site.

### Accomplishments

- Built a website that shows information about marine sustainability, focused on the Gulf of Mexico.

- Published a public survey where people can record marine debris they spotted and/or picked up.

- Created an educational tool that will help bring awareness of the problems facing our oceans and provide resources to help take action.

### What we learned

- We learned how scientists measure species diversity in specific areas. We learned how to use diversity indexes like the Shannon-Wiener Index to mathematically measure and compare species diversity among communities.

- How to secure API keys for a public facing application.

- How heavily humans have impacted the aquatic ecosystem.

### Next steps

- Adding more data as factors that could affect some of the data in our applications. For example, adding a layer for ocean salinity, ocean acidity, and pollution into some of the applications. There are more factors contributing to sustainability issues in our oceans that we did not have time to illustrate.

- Create a script to generate the data from the ArcGIS Platform location services.

- Run statistics from the marine debris data once we have more survey submissions.

- Donate a dollar to charity for each piece of debris picked up.

- Integrate more filters on the Marine Species Rarity vs. Protected Area Map

- Route to the closest land point when the debris is in the ocean.

- Spatial Analysis: How are we doing in protecting rare species’ living areas?

## Mapping data sources

- Global Marine Species Patterns (55km), by Map of Life (MoL) [source](https://www.arcgis.com/home/item.html?id=bf2862f403b94411ac2428dc9c9bce03)

- WDPA - World Database of Protected Areas, by UN Environment World Conservation Monitoring Centre [source](https://www.arcgis.com/home/item.html?id=ae78aeb913a343d69e950b53e29076f7)

- Gulf of Mexico region with GSHHS and/or NaturalEarth shorelines, by GSHHG - A Global Self-consistent, Hierarchical, High-resolution Geography Database [source](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)

- Depth Contour at multiple intervals of GEBCO 2020 Bathymetry - Gulf of Mexico, by GCOOS - Gulf of Mexico Coastal Ocean Observing System [source](https://www.gebco.net/data_and_products/gridded_bathymetry_data/)

- Sea Surface Temperature (°C), by Naval Oceanographic Office [source](https://www.arcgis.com/home/item.html?id=7b421e42c17b43f8ad7222b8f71d09e7)

## Run the app locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

**`npm install`**

**`npm start`**

Starts the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**`npm run build`**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Built with

- [ArcGIS JavaScript API](https://developers.arcgis.com/javascript/latest/)
- [ArcGIS REST JS](https://developers.arcgis.com/arcgis-rest-js/)
- [ArcGIS Platform](https://developers.arcgis.com/documentation/mapping-apis-and-services/arcgis-platform/)
- [Calcite Components](https://developers.arcgis.com/calcite-design-system/)
- [Styled Components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/#/)
- [Vercel](https://vercel.com)
