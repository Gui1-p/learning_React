interface HeroDescription{
    image_1: string;
    alt_1: string;
    text_1: string;
    image_2: string;
    alt_2: string;
    text_2: string;
}

export function Hero_2({ image_1, alt_1, text_1, image_2, alt_2, text_2 }:HeroDescription) {
   return(
    <div className="bg-zinc-200 border-y border-zinc-300">
        <div id="about"className="max-w-6xl mx-auto space-y-12">
             <div className="flex items-center justify-between p-4 gap-8">
                 <div className="flex-1 text-center">
                     <p className="text-lg text-zinc-900"> {text_1} </p>
                 </div>

                 <div className="flex-1 flex justify-center">
                     <img src = {image_1} alt = {alt_1} className="rounded-xl size-96 object-cover"/>
                 </div>
             </div>

             <div className="flex items-center justify-between p-4 gap-8">
                 <div className="flex-1 flex justify-center">
                     <img src = {image_2} alt = {alt_2} className="rounded-xl size-96 object-cover"/>
                 </div>

                 <div className="flex-1 text-center">
                     <p className="text-lg text-zinc-900"> {text_2} </p>
                 </div>
             </div>
        </div>
    </div>
    );
}