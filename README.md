# Ajay Kumar — Professional Portfolio

## Pages included
- `index.html` — main portfolio: profile photo + about on the right, education, skills, experience, selected work, contact
- `photography.html` — separate scrolling gallery for photography and DOP work
- `design.html` — separate scrolling gallery for graphic design, posters and edited visuals
- `styles.css` — professional responsive styling
- `script.js` — portfolio image list, gallery rendering and click-to-enlarge previews
- `scene.js` — subtle mouse-interactive Three.js background

## Add your profile photo
Upload your portrait to the repository folder `Images` and name it `ajay-profile.jpg`. The main page expects `Images/ajay-profile.jpg`. If your photo has a different name, update the image path in `index.html`.

## Add your real work images
1. Create a folder named `Images` in the GitHub repository.
2. Upload your poster, photography, DOP stills, graphic designs and edited visuals there.
3. Open `script.js` and edit the `portfolioItems` array.
4. For each work item, set `title`, `category`, `type`, `image`, and `description`.
   - Use `category: "photography"` for photography and DOP frames.
   - Use `category: "design"` for graphic design, posters, social media creatives, branding and edited visuals.
5. Example:
```js
{title:"Campus Event Coverage",category:"photography",type:"DOP / Event Coverage",image:"Images/campus-event.jpg",description:"Visual coverage of a university event."},
{title:"Cinematic Poster",category:"design",type:"Poster / Digital Art",image:"Images/cinematic-poster.jpg",description:"Cinematic poster artwork."}
```
6. Keep each item separated by a comma. The homepage previews the first three items. The two subpages show all items from their category and include click-to-enlarge image previews.

## Publish on GitHub Pages
1. Back up the existing repository first.
2. Upload these files to the root of your existing `portfolio` repository.
3. Upload your `Images` folder and real images.
4. Commit changes to the branch used by GitHub Pages.
5. Confirm Settings → Pages is set to the right branch and root folder.
6. Open https://ajaykumarbv193.github.io/portfolio/

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages

## Details to verify
- The profile image is a placeholder path until you upload your photo.
- Confirm the exact official title “Director of Photography (DOP)” is how Mount Carmel University describes your role; edit the title if your appointment uses different wording.
- This template uses public CDNs for Google Fonts and Three.js.

## Image folders
- `Images/photography/` — photography, DOP stills, cinematic artwork
- `Images/design/` — graphic design, posters, branding and social creatives
- `Images/ajay-profile.jpg` — your profile photo

The portfolio CSS has been widened so content uses more of the screen with consistent responsive side padding. Update the six sample image paths in `script.js` to match the actual filenames you upload.
