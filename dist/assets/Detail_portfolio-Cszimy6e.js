import{r as d,j as g,o as i,c as a,a as o,t as n,b as _,w as k,F as h,g as x,k as b,d as v,e as j}from"./index-CK_9spMF.js";const y={class:"bg-gradient-to-r from-gray-300 to-blue-50 dark:from-slate-900 dark:to-blue-800 flex justify-center items-start min-h-screen pt-20"},S={key:0,class:"w-full sm:w-3/5 lg:w-2/5 mx-auto bg-white shadow-lg rounded-lg p-4 mt-20"},N=["src"],w={class:"flex items-center justify-between mb-4"},P={class:"text-xl font-bold mb-1"},V={class:"text-sm text-gray-500"},L={class:"text-sm text-gray-700 mb-4"},B={class:"grid grid-cols-2 gap-2"},D={key:1,class:"text-center text-red-500 mt-20"},M={__name:"Detail_portfolio",setup(I){const c=d([{id:1,kategori_id:1,portfolio:"SIMRS",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]},{id:2,kategori_id:1,portfolio:"OSBOND GYM",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]},{id:3,kategori_id:2,portfolio:"BPSDM",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]},{id:4,kategori_id:2,portfolio:"Poltekkes KEMENKES Semarang",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]},{id:5,kategori_id:3,portfolio:"MD CLINIC",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]},{id:6,kategori_id:3,portfolio:"BAJ",foto:"https://fosan.id/images/fosanlogo.png",technologies:["Vue.js","PostgreSQL","Node.js"]}]),u=d([{id:1,kategori:"Kesehatan"},{id:2,kategori:"Edukasi"},{id:3,kategori:"WMS"}]),f=b(),m=parseInt(f.params.id),e=g(()=>c.value.find(s=>s.id===m)),p=g(()=>{const s=u.value.find(t=>{var r;return t.id===((r=e.value)==null?void 0:r.kategori_id)});return s?s.kategori:"Kategori Tidak Ditemukan"});return(s,t)=>{const r=v("router-link");return i(),a("div",y,[e.value?(i(),a("div",S,[o("img",{src:e.value.foto,alt:"Project Image",class:"w-full h-40 object-cover rounded-md mb-4"},null,8,N),o("div",w,[o("div",null,[o("h1",P,n(e.value.portfolio),1),o("p",V,"Kategori: "+n(p.value),1)]),_(r,{to:`/portfolio/kategori/${e.value.kategori_id}`,class:"px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition"},{default:k(()=>t[0]||(t[0]=[j(" Kembali ")])),_:1},8,["to"])]),o("p",L,n(e.value.description),1),o("div",null,[t[1]||(t[1]=o("h3",{class:"text-md font-semibold mb-2"},"Teknologi:",-1)),o("div",B,[(i(!0),a(h,null,x(e.value.technologies,l=>(i(),a("div",{key:l,class:"bg-gray-100 p-2 rounded-lg shadow-sm text-center text-gray-700 text-xs font-medium"},n(l),1))),128))])])])):(i(),a("div",D,t[2]||(t[2]=[o("h2",{class:"text-lg font-semibold"},"Proyek tidak ditemukan.",-1)])))])}}};export{M as default};
