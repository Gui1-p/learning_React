interface HeroDescription{
    image_1: string;
    alt_1: string;
    text_1: string;
    image_2: string;
    alt_2: string;
    text_2: string;
}

export function hero_1({ image_1, alt_1, text_1, image_2, alt_2, text_2 }:HeroDescription) {
   <div>
        <div>
            <p>

            </p>
            <img src = {image_1} alt = {alt_1}></img>
        </div>
        
        <div>
            <img src = {image_1} alt = {alt_1}></img>
            <p>

            </p>
        </div>
   </div> 
}