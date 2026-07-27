import type { ExcursionData } from "../types";

/* EXCURSION DATA — the ONLY section to edit for a new sheet.
   Text is reproduced verbatim from the source itinerary; do not
   paraphrase when adapting for another trip unless intended.
   Image slots take any direct image URL (Wikimedia Special:FilePath
   links are hotlink-safe and a good free default). */
export const normandyIn3Journeys: ExcursionData = {
  region: "normandie",
  title: "Normandy in 3 Journeys",
  lede: [
    "A two-day educational journey exploring three of Normandy’s most powerful legacies: the Middle Ages, the Second World War and Impressionism.",
    "Through historical sites, landscapes, museums and participatory activities, students discover how these three major periods shaped Normandy and continue to influence its identity today.",
  ],
  duration: [
    { label: "Duration", value: "2 days, 1 night" },
    { label: "Departure from Paris", value: "Saturday before 9:00 a.m." },
    { label: "Return to Paris", value: "Sunday before 8:00 p.m." },
    { label: "Transportation", value: "Private coach" },
  ],
  coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Etretat_beach_and_cliffs.JPG",

  sheets: [
    {
      type: "transit-destination",
      day: 1,
      transit: {
        route: "Bus — Departure from Paris",
        activities: [
          {
            format: "BUSCAST",
            title: "Introduction",
            paragraphs: [
              "A lively introduction to the weekend, its itinerary and its three main themes.",
              "This onboard format prepares students for the journey ahead and provides the essential context needed to connect the different places and historical periods explored during the programme.",
            ],
          },
          {
            format: "Pulse",
            title: "The Motorway Service Area: A National Institution",
            paragraphs: [
              "An unexpected exploration of the French motorway service area as a place of travel, consumption and everyday culture.",
              "Students examine what this familiar environment reveals about French lifestyles, regional identity and the country’s relationship with mobility.",
            ],
          },
        ],
      },
      destination: {
        name: "Rouen — The Middle-Ages Journey",
        images: [
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/France_Rouen_Cathedral_facade_a.JPG",
            alt: "Rouen Cathedral",
          },
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rouen_-_Gros_horloge_%282%29.jpg",
            alt: "Rue du Gros-Horloge, Rouen",
          },
        ],
        intro: [
          "Rouen provides an exceptional setting for understanding medieval Normandy.",
          "Its cathedral, historic streets and association with Joan of Arc allow students to explore the political, religious and everyday realities of the Middle Ages directly in the places where history unfolded.",
        ],
        activity: {
          format: "Pulse",
          title: "Debunk the Middle Ages",
          paragraphs: [
            "An engaging walking exploration of Rouen designed to challenge common misconceptions about medieval life.",
            "Through observation, discussion and storytelling, students investigate how people lived, believed, worked and understood the world around them.",
            "Rather than presenting the Middle Ages as a distant or purely dark period, the activity encourages participants to compare medieval society with their own lives and question common assumptions about the period.",
          ],
        },
        lists: [
          {
            heading: "3 Topics",
            items: [
              "Medieval Lifestyle: a Life to Envy – or Escape?",
              "Gothic Cathedral: a Spaceship to Heaven",
              "Joan of Arc: The Spy who Ended the Middle Ages",
            ],
          },
          {
            heading: "Additional Activities",
            items: [
              "Lunch in a Traditional Restaurant",
              "Tasting of Local Products",
              "Viewpoint of a Medieval Castle",
            ],
          },
        ],
        closing: "Lunch and Free Time in Rouen",
      },
    },

    {
      type: "transit-destination",
      day: 1,
      transit: {
        route: "Bus — Rouen to Omaha",
        activities: [
          {
            format: "BUSCAST",
            title: "Letter to a Soldier",
            paragraphs: [
              "An exploration of letters and personal correspondence written by people directly affected by the war, including soldiers, relatives and civilians.",
              "Their words provide an intimate and immediate perspective on the conflict, helping students understand not only what happened, but also how individuals experienced uncertainty, separation, fear and hope.",
            ],
          },
        ],
      },
      destination: {
        name: "Omaha — Landscapes of War",
        images: [
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Normandy_American_Cemetery_and_Memorial_%287937936%29.jpg",
            alt: "Normandy American Cemetery",
          },
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Omaha_Beach%2C_Normandy_%2835289899794%29.jpg",
            alt: "Omaha Beach",
          },
        ],
        intro: [
          "Students explore the landscapes of the Normandy landings and discover how beaches, villages, memorials and cemeteries have become places where military history, personal memories and present-day life coexist.",
          "The experience examines how local communities rebuilt their lives while preserving the physical traces, personal stories and collective memories of the conflict.",
        ],
        activity: {
          format: null,
          title: "D-Day by Bus",
          paragraphs: [
            "A guided exploration of the Omaha Beach area by coach, combining historical interpretation, landscape observation and visits to major remembrance sites.",
            "Students discover where some of the most significant events of D-Day took place and examine how geography, military planning and individual experiences shaped the events of 6 June 1944.",
            "The activity also encourages students to consider how history is remembered, transmitted and interpreted by different generations.",
          ],
        },
        lists: [
          {
            heading: "Main Stops",
            items: ["American Cemetery", "Key Site of Omaha Beach"],
          },
          {
            heading: "Additional Activities",
            items: [
              "Tasting of Local Products",
              "Official Ceremony Honouring Fallen Soldiers",
              "Museum or Collection Dedicated to the Second World War",
            ],
          },
        ],
      },
    },

    {
      type: "destination-only",
      day: 1,
      destination: {
        name: "Bayeux — Quaint and Timeless",
        images: [
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bayeux_Cathedral.JPG",
            alt: "Bayeux Cathedral",
          },
        ],
        intro: [
          "After a day devoted to major historical events, Bayeux offers a quieter and more intimate experience of Normandy.",
          "Its preserved historic centre, traditional architecture and relaxed atmosphere provide the ideal setting for an overnight stay.",
        ],
        lists: [
          {
            heading: "Accommodation",
            items: ["Hotel Check-in", "Orientation", "Traditional Dinner"],
          },
        ],
      },
    },

    {
      type: "transit-destination",
      day: 2,
      transit: {
        route: "Bus — Bayeux to Honfleur",
        activities: [
          {
            format: "BUSCAST",
            title: "Impressionism in 20 Minutes",
            paragraphs: [
              "A concise and engaging introduction to Impressionism, its main innovations and Normandy’s central role in its development.",
              "During the journey, students receive the essential historical and artistic context needed to recognise the movement’s ideas, techniques and subjects when they arrive in Honfleur.",
            ],
          },
        ],
      },
      destination: {
        name: "Honfleur — The Arts and Delights Journey",
        images: [
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vieux_bassin_Honfleur.JPG",
            alt: "Vieux Bassin, Honfleur",
          },
        ],
        intro: [
          "With its historic harbour, changing light and long association with artists, Honfleur provides an ideal environment for understanding Normandy’s artistic heritage.",
          "Students explore how painters, musicians and cultural institutions have interpreted the town and transformed everyday places into sources of artistic inspiration.",
        ],
        activity: {
          format: "Pulse",
          title: "I lOVE MUSEUM",
          paragraphs: [
            "An innovative and participatory approach to museums and cultural resources, designed to make museum visits engaging, accessible and memorable.",
            "The activity is particularly suitable for students who are unfamiliar with museums, reluctant to visit them or interested in discovering new ways of observing and interpreting artworks.",
            "Through challenges, discussions, visual observation and personal responses, participants become active visitors rather than passive spectators.",
          ],
        },
        lists: [
          {
            heading: "2 Artistic Explorations",
            items: [
              "Monet, Boudin and Norman Impressionism",
              "Erik Satie: A Journey into the World of Dreams",
            ],
          },
        ],
        closing: "Lunch and Free Time in Honfleur",
        extra: {
          title: "Boat Ride",
          paragraphs: [
            "A boat ride offers a memorable conclusion to the weekend, with remarkable views of the harbour, the Normandy coastline and the surrounding maritime landscape.",
            "It provides a final opportunity to experience Honfleur from a different perspective and reflect on the discoveries made during the journey.",
          ],
        },
      },
    },
  ],

  closing: {
    route: "Bus — Return to Paris",
    contact: [
      { label: "Email", value: "[votre email]" },
      { label: "Téléphone", value: "[votre téléphone]" },
      { label: "Site web", value: "[votre site]" },
    ],
  },
};
