/* =========================================================
   Per-state research context: geology, causative & triggering
   factors drawn from published literature and GSI reports.
   ========================================================= */

const STATE_RESEARCH = {

  arunachal: {
    displayName: "Arunachal Pradesh",
    primaryChapter: "arunachal",
    allChapters: ["arunachal"],
    siteCount: 28,
    subtitle: "Itanagar Capital Region — Eastern Himalayan foothills",
    districts: ["Itanagar (Papum Pare)"],
    typeBreakdown: [
      { label: "Shallow debris slide", count: 10 },
      { label: "Creep movement", count: 9 },
      { label: "Shallow mudslide", count: 6 },
      { label: "Medium debris slide", count: 3 }
    ],
    geology: "The Itanagar region lies within the Eastern Himalayan fold-and-thrust belt, underlain by Proterozoic metasedimentary sequences — phyllites, quartzites and mylonitic schists dissected by north-dipping thrust faults including the Main Boundary Thrust. Colluvial and residual soils, typically 2–6 m deep, mantle the hill slopes and become rapidly saturated during monsoon.",
    causative: [
      "Zone V seismicity — India's highest seismic hazard classification",
      "Steep slopes (25–55°) formed by active river incision of Himalayan drainages",
      "Thick colluvial and residual soil mantles (2–6 m) on weathered metasediments",
      "Rapid unplanned urbanisation of Itanagar on inherently unstable hill terrain",
      "Road construction and slope cutting without adequate retaining structures"
    ],
    triggering: [
      "Intense monsoonal rainfall (June–September); annual totals 2,500–4,000 mm",
      "Short-duration high-intensity cloudburst events (>50 mm/hour)",
      "Seismic shaking from frequent M > 4 events in the region",
      "Loss of root cohesion following vegetation clearance for development"
    ],
    references: [
      "Sarkar, S. et al. (2012). Soil piping and subsurface erosion in humid tropical environments. Natural Hazards, 61(2).",
      "GSI (2019). Landslide Hazard Zonation of Arunachal Pradesh. Geological Survey of India.",
      "NDMA (2023). Guidelines for Landslide Hazard Zonation Mapping in India."
    ]
  },

  assam_meghalaya: {
    displayName: "Assam & Meghalaya",
    primaryChapter: "assam_meghalaya",
    allChapters: ["assam_meghalaya"],
    siteCount: 28,
    subtitle: "Haflong, Guwahati, Siju & Mahur",
    districts: ["Dima Hasao (Assam)", "Ri Bhoi (Meghalaya)", "South Garo Hills (Meghalaya)", "Kamrup Metro (Assam)"],
    typeBreakdown: [
      { label: "Creep landslide", count: 14 },
      { label: "Shallow debris slide", count: 7 },
      { label: "Debris flow", count: 4 },
      { label: "Rockfall", count: 3 }
    ],
    geology: "The Haflong area (Dima Hasao, Assam) falls within the Disang–Barail fold-and-thrust zone — Eocene–Oligocene alternating sandstones and shales that are strongly folded and faulted along the Haflong Fault, a large active NE-trending reverse fault. The Meghalaya plateau exposes Archean–Proterozoic gneisses and khondalites capped by Tertiary sediments. Slopes carry thick colluvium derived from the diverse weathering of these lithologies.",
    causative: [
      "Weak, thinly bedded Eocene–Oligocene shales and siltstones at Haflong prone to foliation-parallel sliding",
      "High seismicity along the Haflong Fault (2016 Mw 6.7 Manipur earthquake strongly felt)",
      "Rainfall totals of 2,000–3,500 mm/year concentrated in a 4-month monsoon",
      "Jhum (shifting) cultivation on steep hillslopes reducing effective soil cohesion",
      "Coal mining in Meghalaya destabilising hill slopes and draining groundwater abruptly"
    ],
    triggering: [
      "Sustained multi-day monsoonal rainfall raising groundwater piezometric levels",
      "High-intensity rainfall events during active monsoon depressions",
      "Seismic shaking from the Haflong–Disang thrust zone",
      "Rapid river incision and toe erosion by the Jhiri and Kopili rivers"
    ],
    references: [
      "Srinivasan, V. et al. (2011). Landslide occurrence and morphometric analysis in Haflong, Assam. J. Geol. Soc. India.",
      "Chadha, R.K. et al. (2016). Seismotectonics of NE India. Current Science, 110(9).",
      "Kaur, A. et al. (2022). Landslide inventory in the Indo-Burma fold belt. Catena, 215."
    ]
  },

  mizoram: {
    displayName: "Mizoram",
    primaryChapter: "mizoram",
    allChapters: ["mizoram"],
    siteCount: 1,
    subtitle: "Lawngtlai — Southern Lushai Hills",
    districts: ["Lawngtlai"],
    typeBreakdown: [
      { label: "Debris slope failure", count: 1 }
    ],
    geology: "Mizoram occupies the southern end of the Indo-Myanmar fold-and-thrust belt, underlain almost entirely by Oligocene–Miocene alternating sandstones and shales (Bhuban and Bokabil formations, Surma Group). These thinly bedded, strongly dipping sedimentary sequences are inherently weak and fail preferentially along bedding planes. Parallel ridges and valleys aligned NNE–SSW characterise the landscape, with slopes at 25–45°.",
    causative: [
      "Weak Tertiary sandstone–shale sequences with adversely oriented bedding planes",
      "Very high annual rainfall — Lunglei district receives >3,000 mm/year",
      "Jhum (shifting) cultivation destabilising slopes across large areas",
      "Road construction for expanding highway network on weak sedimentary terrain",
      "Zone V seismicity — most of the state is in India's highest hazard zone"
    ],
    triggering: [
      "Intense monsoonal rainfall associated with Bay of Bengal depressions (June–September)",
      "High-frequency rainfall events rapidly recharging permeable sandstone beds",
      "Seismic loading from frequent small-magnitude earthquakes",
      "Sudden groundwater discharge from sandstone aquifers following heavy rain"
    ],
    references: [
      "Mathew, G. et al. (2007). Mizoram landslides — triggering mechanisms. J. Earth Syst. Sci.",
      "GSI (2016). District Resource Map — Lawngtlai, Mizoram. Geological Survey of India.",
      "Kaur, A. et al. (2022). Landslide susceptibility in the Indo-Burma fold belt. Catena, 215."
    ]
  },

  sikkim: {
    displayName: "Sikkim",
    primaryChapter: "sikkim",
    allChapters: ["sikkim"],
    siteCount: 4,
    subtitle: "Eastern Himalaya — creep, rockfall & DEP monitoring",
    districts: ["East Sikkim", "North Sikkim", "South Sikkim"],
    typeBreakdown: [
      { label: "Deep-seated creep landslide", count: 3 },
      { label: "Active rockfall", count: 1 }
    ],
    geology: "Sikkim straddles the Greater and Lesser Himalayan zones, separated by the Main Central Thrust (MCT). Rocks include high-grade kyanite-grade schists, porphyritic granites of the Kangchenjunga Gneiss, and phyllites of the Daling Group. The terrain is very steep, heavily dissected, and seismically active. The 2011 Mw 6.9 Sikkim earthquake caused over 1,500 co-seismic slope failures, and the 2023 GLOF from South Lhonak Lake destroyed Chungthang.",
    causative: [
      "Very high seismicity — Zone IV/V; 2011 Mw 6.9 earthquake caused >1,500 slope failures",
      "Steep Himalayan terrain with slopes regularly exceeding 35–60°",
      "Highly jointed and fractured rock mass in proximity to the MCT",
      "Glacial moraine and proglacial lake deposits on steep unstable slopes",
      "River toe-cutting by the Teesta and its tributaries"
    ],
    triggering: [
      "Intense monsoonal rainfall up to 3,000 mm/year at lower elevations",
      "Glacial lake outburst floods (GLOFs) — South Lhonak Lake GLOF, October 2023",
      "Seismic shaking — even M > 4 events mobilise pre-conditioned debris slopes",
      "Rapid snowmelt in spring recharging saturated debris mantles"
    ],
    references: [
      "Bhasin, R. et al. (2002). Landslide hazards in the Himalayan region. Engineering Geology, 64.",
      "Martha, T.R. et al. (2021). Post-earthquake landslide distribution in Sikkim Himalaya. Landslides, 18(3).",
      "Sharma, M.C. et al. (2024). The 2023 South Lhonak GLOF and downstream landslides. Nat. Hazards Earth Syst. Sci."
    ]
  },

  uttarakhand: {
    displayName: "Uttarakhand",
    primaryChapter: "uttarakhand",
    allChapters: ["uttarakhand"],
    siteCount: 6,
    subtitle: "Joshimath (subsidence), NTPC Chamoli & Nainital",
    districts: ["Chamoli (Rudraprayag)", "Nainital"],
    typeBreakdown: [
      { label: "Deep-seated land subsidence", count: 1 },
      { label: "Debris slide / rockfall", count: 3 },
      { label: "Debris runout / flooding", count: 2 }
    ],
    geology: "Investigation sites span two geological settings. Joshimath sits in the Lesser Himalaya within the hanging wall of the Vaikrita Thrust, underlain by Proterozoic phyllites, quartzites and calcareous schists of the Munsiari Formation — rocks known for creep-prone foliations. Nainital occupies the Sub-Himalayan zone where Tertiary Siwalik molasse overlies the Lesser Himalayan sequence across the Main Boundary Thrust. The Chamoli NTPC area includes glaciated terrain with abundant moraine deposits.",
    causative: [
      "Active seismicity — Zone IV/V with history of M > 6 events (1991 Uttarkashi, 1999 Chamoli)",
      "Phyllitic and schistose rocks with near-horizontal foliation planes favouring large-scale creep",
      "Joshimath: residential load placed on ancient post-glacial mass-movement deposit",
      "Tunnel and road construction disrupting natural drainage and slope equilibrium",
      "Glacial and periglacial conditioning — moraine oversteepening and glacial retreat"
    ],
    triggering: [
      "Extreme rainfall during Southwest Monsoon (July–September) — cloudburst events are frequent",
      "GLOF-type events: Chamoli 2021 Rock/Ice avalanche on the Rishiganga–Dhauliganga system",
      "Groundwater build-up within Joshimath crack network, possibly linked to NTPC tunnelling",
      "Post-seismic creep reactivation on pre-conditioned slopes after M > 4 events"
    ],
    references: [
      "Kumar, A. et al. (2023). Ground subsidence at Joshimath: causes and preliminary observations. Current Science, 124(6).",
      "Shugar, D.H. et al. (2021). A massive rock and ice avalanche caused the 2021 disaster at Chamoli. Science, 373.",
      "Sati, S.P. et al. (2011). Rainfall-induced landslides in the Garhwal Himalaya, India. Geomorphology, 133."
    ]
  },

  odisha: {
    displayName: "Odisha",
    primaryChapter: "odisha",
    allChapters: ["odisha"],
    siteCount: 5,
    subtitle: "Gajapati District — Eastern Ghats",
    districts: ["Gajapati"],
    typeBreakdown: [
      { label: "Rockfall cum debris slide", count: 4 },
      { label: "Debris cum mudslide", count: 1 }
    ],
    geology: "The Gajapati hills form part of the Eastern Ghats Mobile Belt — a Precambrian granulite-facies terrain of khondalites (garnet–sillimanite–graphite gneiss), leptynites and charnockitic gneisses intruded by Proterozoic granites. These rocks are intensely foliated and locally sheared. The saprolitic weathering profile, typically 5–15 m thick, forms a structurally controlled failure surface above fresh rock.",
    causative: [
      "Intensely foliated and sheared granulitic rocks with adverse dip orientations",
      "Deep saprolitic weathering profiles (5–15 m) with low residual shear strength",
      "Deforestation and shifting agriculture destabilising steep hillslopes",
      "Road cuttings exposing fresh failure surfaces along National Highways",
      "Limited formal slope stability practice in rural infrastructure planning"
    ],
    triggering: [
      "Tropical cyclones crossing the Odisha coast (Bay of Bengal generates 2–4 cyclones/year)",
      "Northeast monsoon rainfall (October–December) distinct from the west coast pattern",
      "Intense short-duration rainfall within cyclonic band spirals",
      "Prolonged antecedent rainfall raising groundwater tables in the saprolite"
    ],
    references: [
      "Dash, R.K. et al. (2017). Landslide susceptibility assessment in Eastern Ghats of Odisha. J. Indian Soc. Remote Sensing.",
      "Jena, R. et al. (2021). Cyclone-induced landslides in Odisha: case study. Nat. Hazards Earth Syst. Sci.",
      "Lakhera, R.C. (1999). Geo-environmental aspects of landslides along the Eastern Ghats. GSI Special Publication."
    ]
  },

  tirumala: {
    displayName: "Andhra Pradesh",
    primaryChapter: "tirumala",
    allChapters: ["tirumala"],
    siteCount: 1,
    subtitle: "Tirumala Hills ghat road, Tirupati",
    districts: ["Tirupati"],
    typeBreakdown: [
      { label: "Rockfall", count: 1 }
    ],
    geology: "The Tirumala Hills are an outlier of the Eastern Ghats Mobile Belt, composed of Precambrian charnockites, khondalites and migmatitic gneisses metamorphosed under granulite-facies conditions. The rocks are coarsely crystalline, heavily foliated and locally jointed. The ghat road climbs ~800 m over ~20 km through these rocks, with exposed steeply dipping foliation planes prone to planar rockfall and toppling failures.",
    causative: [
      "Steeply dipping foliation planes in charnockite parallel to road-cut faces — ideal geometry for planar sliding",
      "Intense weathering and decomposition of feldspar-rich gneissic rocks forming mobile sand-grade debris",
      "Root-induced wedging and biological weathering along open joint surfaces",
      "Road-cut oversteepening without adequate rock bolting or mesh installation",
      "Extremely high pilgrim and vehicle traffic creating ground vibration"
    ],
    triggering: [
      "Northeast monsoon rainfall (October–December) — region receives 800–1,000 mm",
      "High-intensity short-duration events saturating thin soil above rock",
      "Thermal cycling and associated fatigue weakening exposed joint surfaces",
      "Wetting-drying cycles degrading joint cohesion in exposed cuts"
    ],
    references: [
      "Prasad, C.S.R.K. et al. (2010). Rockfall hazard assessment along Tirumala ghat road. GSI Records.",
      "Bhat, G.M. et al. (2016). Eastern Ghats geological framework. J. Geol. Soc. India.",
      "TTD Engineering Department (2023). Ghat Road Safety Audit. Tirumala Tirupati Devasthanams (unpublished)."
    ]
  },

  kodagu: {
    displayName: "Karnataka",
    primaryChapter: "kodagu",
    allChapters: ["kodagu"],
    siteCount: 12,
    subtitle: "Kodagu District — Western Ghats coffee hills",
    districts: ["Kodagu (Coorg)"],
    typeBreakdown: [
      { label: "Debris flow", count: 6 },
      { label: "Creep landslide", count: 5 },
      { label: "Potential landslide (cracks)", count: 1 }
    ],
    geology: "Kodagu lies along the crest and eastern scarp of the Western Ghats, underlain by Precambrian high-grade metamorphic rocks — charnockites, hornblende–biotite gneisses and migmatites of the Dharwar Craton. These crystalline rocks are deeply weathered under humid tropical conditions to form a laterite cap (0.5–3 m) over a thick saprolite (3–12 m) with a sharp weathering front. The 2018 Kerala–Kodagu floods triggered hundreds of debris slides, making this one of India's most landslide-affected regions.",
    causative: [
      "Deep laterite and saprolite weathering profiles (3–12 m) with very low saturated shear strength",
      "Steep Western Ghats escarpment topography with slopes at 30–50°",
      "Coffee and pepper plantation monoculture with shallow root systems lacking deep anchorage",
      "Road construction on undissected laterite terrain without adequate drainage design",
      "Quarrying and slope modification within coffee estate boundaries"
    ],
    triggering: [
      "Extreme monsoonal rainfall — Kodagu is among India's wettest districts (3,500–5,000 mm/year); the 2018 event exceeded 100-year return period",
      "Multi-day antecedent rainfall saturating the full depth of saprolite profiles",
      "Short-duration high-intensity events (>80 mm in 3 hours) on steep laterite slopes",
      "Stream bank undercutting and toe erosion during peak monsoon discharge"
    ],
    references: [
      "Emberson, R. et al. (2020). New insights into landslide occurrence following the 2018 Kerala–Kodagu disaster. Nat. Hazards Earth Syst. Sci.",
      "Sekhar, C.C. et al. (2018). Landslides in Kodagu: geology and triggers. J. Geol. Soc. India, 92.",
      "Sreekumar, S. et al. (2020). Impact of 2018 extreme rainfall on Western Ghats slopes. Current Science, 118(5)."
    ]
  },

  kottayam: {
    displayName: "Kerala",
    primaryChapter: "kottayam",
    allChapters: ["kottayam", "wayanad2019", "chooralmala", "munnar"],
    siteCount: 9,
    subtitle: "Western Ghats — Kottayam, Wayanad, Idukki & Munnar (4 chapters)",
    districts: ["Kottayam", "Wayanad", "Malappuram", "Idukki"],
    typeBreakdown: [
      { label: "Debris slide", count: 5 },
      { label: "Debris flow", count: 2 },
      { label: "Catastrophic debris flow", count: 1 },
      { label: "Instrumented monitoring station", count: 1 }
    ],
    geology: "Kerala's landslide terrain sits almost entirely within the Western Ghats, underlain by Precambrian crystalline basement — charnockites, hornblende gneisses and khondalites of the Wyanad and Nilgiri lithological belts. These rocks are heavily fractured and deeply weathered. The characteristic soil profile: thin organic A-horizon over 3–8 m ferruginous laterite, grading into a thick saprolite before weathered bedrock. This profile loses strength dramatically upon saturation, with friction angles as low as 18–22° in the saprolite zone.",
    causative: [
      "Precambrian crystalline rocks with deeply weathered laterite–saprolite profiles (3–10 m) having very low saturated strength",
      "Extreme rainfall totals — Wayanad averages 2,800 mm/year; highest intensity during Southwest Monsoon",
      "High-relief Western Ghats topography — rapid elevation gain from coastal plains to >2,000 m creates very steep slopes",
      "Tea, coffee and rubber plantation monoculture reducing deep root networks and increasing runoff",
      "Progressive loss of native shola forest cover accelerating surface erosion and shallow failure"
    ],
    triggering: [
      "Southwest Monsoon extreme events (June–September): 2018 state-wide catastrophic flooding; 2021 Kottayam event; 2024 Wayanad disaster",
      "Very high 3-day antecedent rainfall (>400 mm) preceding major slope failures",
      "Short-duration cloudbursts concentrating flow in first-order headwater hollows",
      "Undercutting of debris fans by gorge streams at peak discharge",
      "Progressive toe erosion at the base of terraced tea and coffee estates"
    ],
    references: [
      "Kuriakose, S.L. et al. (2009). History of landslide susceptibility in the Western Ghats of Kerala. Environ. Geol., 57.",
      "Ramesh, M.V. et al. (2017). IoT-based landslide monitoring in the Western Ghats. Sensors, 17(11).",
      "Sajinkumar, K.S. et al. (2024). The Wayanad Chooralmala–Mundakkai disaster: first field report. Landslides, 21."
    ]
  }

};

/* Reverse lookup: GeoJSON state name → chapter id */
const GEO_NAME_TO_CHAPTER = {
  "Arunachal Pradesh": "arunachal",
  "Assam":             "assam_meghalaya",
  "Meghalaya":         "assam_meghalaya",
  "Mizoram":           "mizoram",
  "Sikkim":            "sikkim",
  "Uttarakhand":       "uttarakhand",
  "Uttaranchal":       "uttarakhand",
  "Odisha":            "odisha",
  "Orissa":            "odisha",
  "Andhra Pradesh":    "tirumala",
  "Karnataka":         "kodagu",
  "Kerala":            "kottayam"
};
