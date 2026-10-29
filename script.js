// Replace the example image paths below with your own files inside the Images folder.
// Photography files: Images/photography/your-photo.jpg
// Design files: Images/design/your-design.jpg
// Keep image filenames and capitalization exactly the same as GitHub.
const portfolioItems = [
 {title:"Cinematic Poster 01",category:"photography",type:"Poster / Cinematic Art",image:"Images/Dusheera Poster.jpg",description:"Cinematic poster and visual storytelling."},
 {title:"Cinematic Poster 02",category:"photography",type:"Digital Artwork",image:"Images/photography/cinematic-poster-02.jpg",description:"Digital artwork and cinematic concepts."},
 {title:"Visual Identity",category:"design",type:"Branding / Graphic Design",image:"Images/design/visual-identity.jpg",description:"Brand identity and graphic design project."},
 {title:"Social Media Creative",category:"design",type:"Campaign Design",image:"Images/design/social-media-creative.jpg",description:"Social media campaign creative."},
 {title:"Photography 01",category:"photography",type:"Photography / DOP",image:"Images/photography/photography-01.jpg",description:"Photography and DOP still."},
 {title:"Digital Design 01",category:"design",type:"Digital Design",image:"Images/design/digital-design-01.jpg",description:"Digital design and visual communication."}
];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
 if(entry.isIntersecting){entry.target.classList.add("in");observer.unobserve(entry.target);}
}), {threshold:.1});
function setupReveals(root=document){root.querySelectorAll(".reveal").forEach(el=>observer.observe(el));}
function createImage(src,alt){
 const img=document.createElement("img");img.src=src;img.alt=alt;img.loading="lazy";
 img.onerror=()=>{const p=document.createElement("div");p.className="placeholder";p.textContent="ADD IMAGE PATH IN script.js";img.replaceWith(p);};
 return img;
}
function renderHomePreviews(){
 const container=document.getElementById("homePreviews");if(!container)return;
 const items=[...portfolioItems.filter(item=>item.category==="photography").slice(0,2),...portfolioItems.filter(item=>item.category==="design").slice(0,1)];
 items.forEach((item,index)=>{
  const a=document.createElement("a");a.className="preview-card reveal";a.href=item.category==="photography"?"photography.html":"design.html";
  const src=item.image;
  if(src)a.appendChild(createImage(src,item.title));else{const p=document.createElement("div");p.className="empty-art";p.textContent="ADD YOUR WORK IMAGE";a.appendChild(p);}
  const info=document.createElement("div");info.className="preview-info";const type=document.createElement("span");type.textContent=item.type;const h=document.createElement("h3");h.textContent=item.title;const p=document.createElement("p");p.textContent=item.description;info.append(type,h,p);a.appendChild(info);container.appendChild(a);
 });setupReveals(container);
}
function renderFullGallery(category){
 const container=document.getElementById("fullGallery");if(!container)return;
 container.innerHTML="";
 portfolioItems.filter(item=>item.category===category).forEach(item=>{
  const card=document.createElement("article");card.className="gallery-item reveal";
  const im=document.createElement("div");im.className="gallery-image";
  if(item.image){const img=createImage(item.image,item.title);img.addEventListener("click",()=>openLightbox(item.image,item.title));im.appendChild(img);}
  else{const p=document.createElement("div");p.className="placeholder";p.textContent="ADD IMAGE PATH IN script.js";im.appendChild(p);}
  const cap=document.createElement("div");cap.className="gallery-caption";const s=document.createElement("span");s.textContent=item.type;const h=document.createElement("h3");h.textContent=item.title;const d=document.createElement("p");d.textContent=item.description;cap.append(s,h,d);card.append(im,cap);container.appendChild(card);
 });setupReveals(container);
}
const lb=document.getElementById("lightbox");
function openLightbox(src,title){if(!lb)return;document.getElementById("lbImage").src=src;document.getElementById("lbCaption").textContent=title;lb.classList.add("open");document.body.style.overflow="hidden";}
function closeLightbox(){if(!lb)return;lb.classList.remove("open");document.getElementById("lbImage").src="";document.body.style.overflow="";}
document.getElementById("lbClose")?.addEventListener("click",closeLightbox);
lb?.addEventListener("click",e=>{if(e.target===lb)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});
document.querySelectorAll("[data-gallery]").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("[data-gallery]").forEach(b=>b.classList.toggle("active",b===btn));
 renderFullGallery(btn.dataset.gallery);
}));
renderHomePreviews();
if(document.getElementById("fullGallery"))renderFullGallery(document.body.dataset.category||"photography");
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
