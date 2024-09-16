import{a as f,i as d,S as h}from"./assets/vendor-u8rapaCG.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&t(p)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();const b="45998239-83277c8f1384b713dfba7e075",u=document.querySelector(".search-input"),v=document.querySelector(".search-btn"),g=document.querySelector(".images"),m=document.querySelector(".loading-message"),n=document.querySelector(".load-more-btn");let c=1;const L=20;let r,i=0;async function y(){try{const a=(await f.get("https://pixabay.com/api/",{params:{key:b,q:u.value,image_type:"photo",per_page:L,page:c}})).data;if(i+=a.hits.length,console.log(i),console.log(a.totalHits),a.hits.length===0&&c===1){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.style.display="none";return}else i>=a.totalHits?(n.style.display="none",d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):n.style.display="block";const l=a.hits.map(t=>`
        <li class="image">
            <a class="image-link" href="${t.largeImageURL}"><img class="img" src="${t.webformatURL}" alt="${t.tags}"></a>
            <div class="image-info">
              <p class="image-desc">
               <span class="desc title">Likes</span> 
               <span class="desc value">${t.likes}</span> 
              </p>
              <p class="image-desc">
               <span class="desc title">Views</span> 
               <span class="desc value">${t.views}</span> 
              </p>
              <p class="image-desc">
               <span class="desc title">Comments</span> 
               <span class="desc value">${t.comments}</span>
              </p>
              <p class="image-desc">
               <span class="desc title">Downloads</span> 
               <span class="desc value">${t.downloads}</span>
              </p>
            </div>
        </li>
        `).join("");g.insertAdjacentHTML("beforeend",l),r&&r.destroy(),r=new h(".image a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",backgroundColor:"red"}),r.refresh()}catch(o){d.error({title:"Error",message:`An error occurred: ${o.message}`,position:"topRight",backgroundColor:"red"})}finally{m.style.display="none"}}v.addEventListener("click",async o=>{o.preventDefault(),u.value=u.value.trim(),g.innerHTML="",c=1,i=0,m.style.display="block",await y()});n.addEventListener("click",async()=>{c++,m.style.display="block",await y()});
//# sourceMappingURL=index.js.map
