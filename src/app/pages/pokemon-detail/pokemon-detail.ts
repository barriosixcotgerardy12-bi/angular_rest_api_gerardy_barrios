import {Component, computed, effect, inject, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PokemonRestService} from '../../services/pokemon-rest-service';
import {PokemonDetailResponse, PokemonSpeciesResponse} from '../../interfaces/pokemon-detail-response';
import {CharacterDetailView} from '../../components/character-detail-view/character-detail-view';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CharacterDetailView, MatProgressSpinner, MatButton, MatIcon],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  id = input.required<string>();

  private service = inject(PokemonRestService);
  private snack = inject(MatSnackBar);

  pokemon = httpResource<PokemonDetailResponse>(() => this.service.detailUrl(this.id()));

  // Se pide solo cuando ya llegó el Pokémon (de ahí sale la URL de su especie)
  species = httpResource<PokemonSpeciesResponse>(() =>
    this.pokemon.hasValue() ? this.pokemon.value().species.url : undefined
  );

  detail = computed(() => {
    if (!this.pokemon.hasValue()) return null;
    const s = this.species.hasValue() ? this.species.value() : undefined;
    return this.service.toDetail(this.pokemon.value(), s);
  });

  constructor() {
    effect(() => {
      if (this.pokemon.error()) {
        this.snack.open('No se pudo cargar el detalle del Pokémon.', 'Cerrar', {duration: 4000});
      }
    });
  }
}