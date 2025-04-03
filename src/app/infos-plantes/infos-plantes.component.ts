import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Plant } from '../models';

@Component({
  selector: 'app-infos-plantes',
  templateUrl: './infos-plantes.component.html',
  styleUrl: './infos-plantes.component.css'
})
export class InfosPlantesComponent implements OnInit{
  constructor(private route : ActivatedRoute, private ApiService : ApiService){}

  public currentPlant : Plant | undefined;
  
  public id: number = 0;
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      
      this.ApiService.getPlantByID(this.id).subscribe(plant => {
        this.currentPlant = {
          ...plant,
          family: { name: plant.family?.name || "Not specified" },
          genus: { name: plant.genus?.name || "Not specified" },
          species: { name: plant.species?.name || "Not specified" },
          foliage_color: plant.foliage_color || "Not specified",
          flower_color: plant.flower_color || "Not specified",
          toxicity: plant.toxicity || "Not specified",
          edible: plant.edible,
          medicinal: plant.medicinal
        };
      });
    });
  }

  generateDescription(plant: any): string {
    if (!plant) return '';

    let description = `The ${plant.common_name || 'plant'} (${plant.scientific_name || 'unknown scientific name'}) belongs to the ${plant.family?.name || 'unspecified'} family and the ${plant.genus?.name || 'unspecified'} genus. `;

    description += plant.growth_habit ? `It grows in the form of ${plant.growth_habit}. ` : `Its growth habit is not specified, which might mean it has no specific form. `;

    // Reverse or specify the native status
    description += plant.native_status ? `It is mainly found in ${plant.native_status}. ` : `Its native status is unknown, it could be cultivated in different regions. `;

    // Reverse or specify flower and foliage colors
    if (plant.flower_color != "Not specified") {
        description += `Its flowers are ${plant.flower_color || 'unspecified'} in color and its foliage is ${plant.foliage_color || 'unspecified'}. `;
    } else {
        description += `Information on flower and foliage color is missing. `;
    }

    // Reverse or specify toxicity
    if (plant.toxicity != "Not specified") {
        description += `Warning, this plant is considered ${plant.toxicity}. `;
    } else {
        description += `There is no information on toxicity, it could be safe or untested. `;
    }

    // Medicinal use
    description += plant.medicinal ? `It is used for medicinal purposes. ` : `It has no known medicinal use, but this does not mean it could not have any. `;

    // Edibility
    description += plant.edible ? `It is also edible.` : `It is not considered edible, but could be under certain circumstances.`;

    return description;
}

}
