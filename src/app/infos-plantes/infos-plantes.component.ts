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
          family: { name: plant.family?.name || "Non spécifié" },
          genus: { name: plant.genus?.name || "Non spécifié" },
          species: { name: plant.species?.name || "Non spécifié" },
          foliage_color: plant.foliage_color || "Non spécifié",
          flower_color: plant.flower_color || "Non spécifié",
          toxicity: plant.toxicity || "Non spécifié",
          edible: plant.edible,
          medicinal: plant.medicinal
        };
      });
    });
  }

  generateDescription(plant: any): string {
    if (!plant) return '';

    let description = `Le ${plant.common_name || 'plante'} (${plant.scientific_name || 'nom scientifique inconnu'}) appartient à la famille ${plant.family?.name || 'non spécifiée'} et au genre ${plant.genus?.name || 'non spécifié'}. `;

    description += plant.growth_habit ? `Il pousse sous forme de ${plant.growth_habit}. ` : `Son mode de croissance n'est pas précisé, ce qui pourrait signifier qu'il n'a pas de forme spécifique. `;

    // Inverser ou préciser le statut natif
    description += plant.native_status ? `On le trouve principalement dans ${plant.native_status}. ` : `Son statut natif est inconnu, il pourrait être cultivé dans différentes régions. `;

    // Inverser ou préciser les couleurs des fleurs et du feuillage
    if (plant.flower_color != "Non spécifié") {
        description += `Ses fleurs sont de couleur ${plant.flower_color || 'non spécifiée'} et son feuillage est ${plant.foliage_color || 'non spécifié'}. `;
    } else {
        description += `Les informations sur la couleur des fleurs et du feuillage sont manquantes. `;
    }

    // Inverser ou préciser la toxicité
    if (plant.toxicity != "Non spécifié") {
        description += `Attention, cette plante est considérée comme ${plant.toxicity}. `;
    } else {
        description += `Il n'y a pas d'information sur la toxicité, il pourrait être sans danger ou non testé. `;
    }

    // Usage médicinal
    description += plant.medicinal ? `Elle est utilisée à des fins médicinales. ` : `Elle ne possède pas d'usage médicinal connu, mais cela ne signifie pas qu'elle ne pourrait pas en avoir. `;

    // Comestibilité
    description += plant.edible ? `Elle est également comestible.` : `Elle n'est pas considérée comme comestible, mais pourrait l'être dans certaines circonstances.`;

    return description;
}



}
