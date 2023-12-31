# TOGA

## Overview

TOGA is a user-friendly solution to men's fashion essentials and combinations. It saves them from having to spend countless hours browsing clothing stores online and in person. The web app allows men to combine different types of tops, bottoms, and accessory categories, as well as play around with color palletes.
You can discover new color combos and ways to combine men's fashion essentials such as bombers, jeans, chinos, polos, jackets, hoodies, etc. Just select the clothing type and color for each category and press generate - TOGA will give you an AI generated preview of what your new outfit could look like.
Users can also save the generated outfits in their account section and revisit at any time.

### Problem

TOGA is for men who aren't into fashion but still value elegance and feeling confident in their outfit. Going shopping, browsing online, and keeping track of the essentials you own, as well as the possible color combos is time-consuming.
To add to the problem, it's in the interest of clothing stores to expose you to as many items as possible. And with the sea of options out there shopping for clothes is guaranteed to be a frustrating endeavor. Especially if you're not into that.
Sometimes it's also hard to find specific essentials such as t-shirts, polos, jackets, chinos, etc. in the right color and fit. By forging advertising partnerships with clothing companies TOGA has the potential of streamlining this process and show the user the exactly the right item, circumventing search altogether.

### User Profile

Men above the age of 20 who:
1. Base their wardrobe on simple and timeless essentials.
2. AND/OR Aren't into fashion.
3. AND/OR Don't enjoy shopping, searching, or browsing.
4. AND/OR Are too busy to pursue fashion as a hobby, or to shop for clothes as much as they need to.

### Features

1. Learn about the TOGA tool on the landing page.
2. Play around with different clothing type combos and colors using our delightful Playground feature.
3. Generate an AI image preview of whatever you create within the Playground, powered by OpenAI's image generation.
4. Save your image previews in your TOGA account and revisit later.

## Implementation

### Tech Stack

- Node.js
- Express.js
- React.js
- AWS EC2
- (OAuth, nice to have)
- (MongoDB, nice to have)

### APIs

- OpenAI Image API

### Sitemap

1. **Landing Page** - this is where TOGA gets pitched and features get listed, along with several CTA that lead to the Playground page
2. **Playground Page** - this an interactive Playground where the user can select a clothing type and a color for each of the following categories: top, bottom, shoes -> once done, the user clicks "Generate" and the below component appears
3. **Generation Component/Page** - embedded within the Playground (or separate) this element shows the AI-generated image (OpenAI) based on the users input in the Playground so that they can see what their outfit could look like and allowing them to save it
4. **User Account Page** - contains the list of all previously generated outfits images and Playground selections

### Mockups
- **Main feature** (Playground), only for illustrative purposes to understand the core functionality, not comprehensive, specifics of design subject to change:
![Playground feature low-fidelity mock-up](./public/lofi_playground.jpg)

- Playground **Generation Component** (after pressing "Generate"), only for illustrative purposes to understand the core functionality, not comprehensive, specifics of design subject to change:
![Generation component low-fidelity mock-up](./public/lofi_ai_preivew.jpg)

### Data
Stored initially in JSON files with the goal of migrating to a MongoDB configuration.

- **Users.json**: Eg.
```
[
    {
    id: "xyz",
    name: "John Rupert",
    email: "john@example.com"
    }
    ...
]
```
- **UserHistory.json**: Eg.
```
[
    {
        item_id: "abc",
        item_name: "Black bomber with beige chinos",
        image: "url",
        category_selections:[
            {
                category_id: "mnl",
                category_name: "Top",
                clothing_id: "opq",
                clothing_name: "Bomber",
                color: "#000000"
            }
            ...
         ]
    }
    ...
]
```
- **ClothingCategories.json**: Eg.
```
[
    {
        category_id: "mnl",
        category_name: "top",
        clothing_types:
        [
            {
                clothing_id: "opq",
                clothing_name: "Bomber",
                colors: ["#000000", ...]
            }
            ...
        ]
    }
    ...
]
```

### Endpoints

- **GET /user/:id** - provides user info (email, name)
- **GET /user/:id/history** - returns an array of objects, each object contains a preview history item (img url to the OpenAI generated image, as well as info about the configuration with which it was generated, meaning clothing types and colors selected)
- **GET /categories** - returns a list of all categories available in Playground along with their ids
- **GET /category/:id** - returns an array of clothing types for a single category (Eg. for the bottoms category: chinos, jeans, etc. along with available color options for each)
PUBLIC image folder that stores clothing type images, as well as the previews generated by OpenAI

### Auth

This is a nice-to-have feature. If implemented, the user will have to log in or sign up (same page with different forms) first before using the Playground feature. Once a preview outfit image has been generated it gets saved automatically to the user's account.

## Roadmap

1. **Playground Page Front-End** - dummy data, full design with all clothing categories, color selections, and clothing types - tested and working, due Sun Nov 19th midnight
2. **Full Back-End w/o OpenAI calls** - setting up EC2 and Express server, the app uses dummy images instead of OpenAI-generated but the user can use the Playground fully with preview item data being saved on the server and fetched from the server, due Wed Nov 22nd midnight
3. **OpenAI API** - setting up and replacing the dummy image system with OpenAI API calls, displaying the images properly, upon generation, and saving them on the server in a public folder, due Fri Nov 24th midnight
4. **Remaining Front-End** - full design for the landing page and the user account page, if any appropriate back-end functionality is missing it has to implemented here, due Sun Nov 26th midnight
5. **Polish & Clean-Up** - testing and making sure everything works together, planning the nice-to-haves, due Mon Nov 27th midnight
6. **Nice-to-Haves** - implementing OAuth, adding the Signup/Login page and replacing the JSON storage system with MongoDB, due Thu Nov 30th 3pm

## Nice-to-haves

**Accessories** - an extra category to include within Playground and use for preview outfit generation, this would include items such as watches
**Signup/Login Page** - a page that leverages OAuth to securely sign the user in, if it doesn't get implemented the user will instead be identified via cookies
**MongoDB** - a no-SQL database solution that stores all the details of each generated item within the application server running on our AWS EC2, if it doesn't get implemented data will be stored using JSON files
