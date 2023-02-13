import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Transferencia } from "../models/transferencia.model";
import { TransferenciaService } from "../services/transferencia.service";

@Component({
  selector: "app-nova-transferencia",
  templateUrl: "./nova-transferencia.component.html",
  styleUrls: ["./nova-transferencia.scss"],
})
export class NovaTransparenciacomponent {
  @Output() aoTransferir = new EventEmitter<any>();
  valor: number;
  destino: number;

  constructor(private service: TransferenciaService, private router: Router) {}

  transferir() {
    console.log("Solicitada nova transferencia");

    const valorEmitir: Transferencia = {
      valor: this.valor,
      destino: this.destino,
    };
    this.aoTransferir.emit(valorEmitir);
    this.service.adiconar(valorEmitir).subscribe(
      (resultado) => {
        console.log(resultado);
        this.limparCampos();
        this.router.navigateByUrl("extrato");
      },
      (error) => console.error(error)
    );
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
