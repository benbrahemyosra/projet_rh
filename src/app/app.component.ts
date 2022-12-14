import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./app-service.service";
import { IModalConfig } from "./interfaces/modal.interface";
import { ChefsServiceService } from "./pages/chefs/service/chefs-service.service";
import { CommandServiceService } from "./pages/commands/service/command-service.service";
import { OptionServiceService } from "./pages/options/service/option-service.service";
import { VacationService } from "./pages/vacation/service/vacation.service";
import { MeetingService } from "./pages/meeting/service/meeting.service";
import { TrainingService } from "./pages/training/service/training.service";
import { UserServiceService } from "./pages/users/service/user-service.service";
import { TableServiceService } from "./shared/table/service/table-service.service";
import { PostService } from "./pages/settings/post/service/post.service";
import * as moment from "moment";
import { TypesService } from "./pages/settings/types-vacation/service/types.service";
import { DemandsService } from 'src/app/pages/demands/service/demands.service';
import { PointageService } from 'src/app/pages/pointage/service/pointage.service';
import { PlanningService } from 'src/app/pages/planning/service/planning.service';
import Swal from 'sweetalert2';
import { ParamSocieteService } from "./pages/settings/param-societe/service/param-societe.service";
import { TypeDemandeService } from "./pages/settings/type-demande/service/type-demande.service";
import { TypeEmployeeService } from "./pages/settings/type-employee/service/type-employee.service";
import { TypePlanningService } from "./pages/settings/type-planning/service/type-planning.service";
import { RapportCongeService } from "./pages/rapport-conge/service/rapport-conge.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  result;
  constructor(
    public _optionService: OptionServiceService,
    public _commandService: CommandServiceService,
    public _chefService: ChefsServiceService,
    public _appService: AppServiceService,
    public trainingService: TrainingService,
    public meetingService: MeetingService,
    public vactionService: VacationService,
    public _demandsService: DemandsService,
    public userService: UserServiceService,
    public tableService: TableServiceService,
    public postService: PostService,
    public paramsService : ParamSocieteService,
    public typeDemandeService : TypeDemandeService ,
    public typeService: TypesService,
    public pointageService: PointageService, 
    public planningService: PlanningService,
    public empService: TypeEmployeeService,
    public typePlanService: TypePlanningService ,
    public rapportService:RapportCongeService,) { }

  ngOnInit(): void {
    this._appService.role= localStorage.getItem('role');
    console.log(  this._appService.role)
    this._appService.closeDialog.subscribe(() => {
      this._appService.MODALS_NUMBER.length > 0
        ? this.handleCancel(
          this.getConfig(this._appService.MODALS_NUMBER.length - 1)
        )
        : null;
    });
  }

  getConfig(index: number): IModalConfig {
    const NAME = this._appService.MODALS_NUMBER[index];
    switch (NAME) {
      case "user":
        return {
          name: "user",
          isVisible: this.userService.isVisible,
          width: "50vw",
          edit: this.userService.SELECTED_USER,
          title_string: "un utilisateur",
          disabled_okay_button: this.getDisabled("user"),
        };
      case "accept":
        return {
          name: "accept",
          isVisible: this._demandsService.isVisible,
          width: "50vw",
          edit: this._demandsService.SELECTED_DEMAND,
          title_string: "un demande",
          disabled_okay_button: false,
        };
       
      case "type conge":
        return {
          name: "type conge",
          isVisible: this.typeService.isVisible,
          width: "50vw",
          edit: this.typeService.SELECTED_TYPE,
          title_string: "un type de congé",
          disabled_okay_button: this.getDisabled("type conge"),
        } ;

        case "type employee":
          return {
            name: "type employee",
            isVisible: this.empService.isVisible,
            width: "50vw",
            edit: this.empService.SELECTED_EMP,
            title_string: "un type d'employée",
            disabled_okay_button: this.getDisabled("type employee"),
          } ;

      case "post":
        return {
          name: "post",
          isVisible: this.postService.isVisible,
          width: "50vw",
          edit: this.postService.SELECTED_POST,
          title_string: "un post",
          disabled_okay_button: this.getDisabled("post"),
        };

        case "type planning":
          return {
            name: "type planning",
            isVisible: this.typePlanService.isVisible,
            width: "50vw",
            edit: this.typePlanService.SELECTED_PLANNING,
            title_string: "un type planning",
            disabled_okay_button: this.getDisabled("type planning"),
        }; 

        case "type demande":
          return {
            name: "type demande",
            isVisible: this.typeDemandeService.isVisible,
            width: "50vw",
            edit: this.typeDemandeService.SELECTED_TYPE,
            title_string: "un type demande",
            disabled_okay_button: this.getDisabled("type demande"),
        }; 
        
        case "parametre":
          return {
            name: "parametre",
            isVisible: this.paramsService.isVisible,
            width: "50vw",
            edit: this.paramsService.SELECTED_PARAMS,
            title_string: "un parametre",
            disabled_okay_button: this.getDisabled("parametre"),
        }; 

      case "detail-user":
        return {
          name: "detail-user",
          isVisible: this.userService.isVisible,
          width: "50vw",
          edit: !!this.userService.SELECTED_USER,
          title_string: "un utilisateur",
          disabled_okay_button: this.getDisabled("detail-user"),
        };

      case "planning":
        return {
          name: "planning",
          isVisible: this.planningService.isVisible,
          width: "50vw",
          edit: this.planningService.SELECTED_planning,
          title_string: "un planning",
          disabled_okay_button: this.getDisabled("planning"),
        };
    
      case "chef":
        return {
          name: "chef",
          isVisible: this._chefService.isVisible,
          width: "50vw",
          edit: !!this._chefService.SELECTED_CHEF,
          title_string: "un chef",
          disabled_okay_button: this.getDisabled("chef"),
        };
      case "option":
        return {
          name: "option",
          isVisible: this._optionService.isVisible,
          width: "50vw",
          edit: !!this._optionService.SELECTED_OPTION,
          title_string: "une option",
          disabled_okay_button: this.getDisabled("option"),
        };
      case "option_detail":
        return {
          name: "option_detail",
          isVisible: this._optionService.isVisibleDetail,
          width: "50vw",
          edit: false,
          title_string: "",
          disabled_okay_button: false,
        };
      case "demande":
        return {
          name: "demande",
          isVisible:this._demandsService.isVisible,
          width: "70vw",
          edit: false,
          title_string: "une demande",
          disabled_okay_button: false,
        };
      case "vacation":
        return {
          name: "vacation",
          isVisible: this.vactionService.isVisible,
          width: "90vw",
          edit: !!this.vactionService.SELECTED_VACATION,
          title_string: "un congé",
          disabled_okay_button: this.getDisabled("vacation"),
        };
      case "training":
        return {
          name: "training",
          isVisible: this.trainingService.isVisible,
          width: "90vw",
          edit: !!this.trainingService.SELECTED_TRAINING,
          title_string: "une formation",
          disabled_okay_button: false,
        };
      case "detail-vacation":
        return {
          name: "detail-vacation",
          isVisible: this.vactionService.isVisible,
          width: "90vw",
          edit: !!this.vactionService.SELECTED_VACATION,
          title_string: "un congée",
          disabled_okay_button: false,
        };
      case "tache":
          return {
            name: "tache",
            isVisible: this.planningService.isVisible,
            width: "50vw",
            edit: this.planningService.SELECTED_planning,
            title_string: "une tâche",
            disabled_okay_button: this.getDisabled("tache"),
          };
      case "detail-rapport":
            return {
              name: "detail-rapport",
              isVisible: this.rapportService.isVisible,
              width: "50vw",
              edit: this.rapportService.SELECTED_RAPPORT,
              title_string: "",
              disabled_okay_button:false,
            };

      default:
        return null;
    }
  }

  getDisabled(str: string): boolean {
    switch (str) {
      case "user":
        if (this.userService.current === 0) {
          return !this.userService.validateForm?.valid;
        } else if (this.userService.current === 1) {
          return !this.userService.validateForm_private?.valid;
        } else {
          return false;
        }
      case "planning":
        if (this.planningService.type != 10 || this.planningService.posttache == false) {
          return !this.planningService.validateForm_general?.valid;
        } else if (this.planningService.type == 10) {
          return !this.planningService.validateForm_tache?.valid;
        } else {
          return false;
        } 
      case "vacation":
        return !this.vactionService.validateFormAdd?.valid;
      case "post":
        return !this.postService.validateForm?.valid;

        case "parametre":
        return !this.paramsService.validateForm?.valid;

        case "type planning":
          return !this.typePlanService.validateForm?.valid;

        case "type demande":
          return !this.typeDemandeService.validateForm?.valid;

        case "type employee":
          return !this.empService.validateForm?.valid;

      case "meeting":
        return this.meetingService.validateForm?.valid;

      case "training":
        return this.trainingService.validateForm?.valid;

      case "type conge":
        return !this.typeService.validateForm?.valid;

      case "accept": return !this._demandsService.validateForm?.valid;

      case "tache": return !this.planningService.validateForm_tache?.valid;

      default:
      return true;
    }
  }

  handleOk(config: IModalConfig): void {
    if (config.name === "vacation") {
      if (!config.edit) {
        this.vactionService.validateFormAdd.value.date_debut = moment(
          this.vactionService.validateFormAdd.value.date_debut
        ).format("YYYY-MM-DD");
        this.vactionService.validateFormAdd.value.date_fin = moment(
          this.vactionService.validateFormAdd.value.date_fin
        ).format("YYYY-MM-DD");
        let idUser=localStorage.getItem('iduser')
         let image= this.rapportService.image;
         let form = {
          ...this.vactionService.validateFormAdd?.value,
          idUser,
          };
          this.rapportService.getResultatRapport(form).subscribe((res: any) => {
          this.rapportService.rapport=res;
          this.rapportService.result=res.result;
          this._appService.MODALS_NUMBER.push('detail-rapport');
            let send_date=new Date( this.rapportService.rapport.datefinConge);
             send_date.setDate(send_date.getDate()+1);
             this.rapportService.rapport.nextDay=send_date;
             this.rapportService.rapport.nextDay= moment(this.rapportService.rapport.nextDay).format("YYYY-MM-DD");
            this.rapportService.rapport.nbJourEffectue= this.rapportService.rapport.nbJourEffectue
            this.rapportService.SELECTED_RAPPORT=null;
            this.rapportService.isVisible = true;
      });
        this.handleCancel(config);
      } else {
        this.tableService.isLoading = true;
        this.vactionService.validateFormAdd.value.date_start = moment(
          this.vactionService.validateFormAdd.value.date_start
        ).format("YYYY-MM-DD");
        this.vactionService.validateFormAdd.value.date_end = moment(
          this.vactionService.validateFormAdd.value.date_end
        ).format("YYYY-MM-DD");
        let image= this.rapportService.image;
        let status=this.vactionService.SELECTED_VACATION.status;
        let idUser=localStorage.getItem('iduser')
        console.log(status)
        let form = {
         ...this.vactionService.validateFormAdd?.value,
         image,
         status
         };
        this.vactionService
          .updateVacations(form,this.vactionService.SELECTED_VACATION.id)
          .subscribe((res: any) => {
            this.vactionService.getVacationById(localStorage.getItem('iduser'),{page:1}).subscribe((res: any) => {
              if( this.vactionService.Tvisiblity.length!==0){
                this.vactionService.clearArray( this.vactionService.Tvisiblity);
                  }
              for (let item of res.data) {
                if(item.code_typeC=='1'){
                  this.vactionService.Tvisiblity.push(true)
                }else{
                  this.vactionService.Tvisiblity.push(false)
                 }
                }
              this.vactionService.table.data = res.data;
              this.vactionService.total = res.total;
              this.tableService.isLoading = false;
            });
              
          });
        this.handleCancel(config);
      }
    }else if (config.name === 'detail-rapport') {
      this.rapportService.rapport.image=this.rapportService.image; 
      this.rapportService.rapport.idUser=localStorage.getItem('iduser');
      console.log(this.rapportService.rapport)
      if(this.rapportService.rapport.result=='Refus' && this.rapportService.rapport.code!='1' ){
        this.rapportService.rapport.result='Attente';
      }
      this.vactionService.addVacations(this.rapportService.rapport).subscribe(res=>{
        console.log(res);
        this.tableService.isLoading = true;;
          this.vactionService.getVacationById(localStorage.getItem('iduser'),{page:1}).subscribe((res: any) => {
            if( this.vactionService.Tvisiblity.length!==0){
              this.vactionService.clearArray( this.vactionService.Tvisiblity);
                }
            for (let item of res.data) {
              if(item.code_typeC=='1'){
                this.vactionService.Tvisiblity.push(true)
              }else{
                this.vactionService.Tvisiblity.push(false)
               }
              }
            this.vactionService.table.data = res.data;
            this.vactionService.total = res.total;
            this.tableService.isLoading = false;
          });
        
        });
         
      this.handleCancel(config);

      } else if (config.name === 'accept'){
        if(this._demandsService.demanrefusClicked){
          this.result='Refus';
         
        }else{
           this.result='Acceptation';
        }
        let result=this.result;
        let form = {
          ...this._demandsService.validateForm?.value,
         result
        };
          this.vactionService.updateVacations(form,this.vactionService.SELECTED_VACATION.id).subscribe(res=>{
            console.log(res);
            this.tableService.isLoading = true;
            this._demandsService.getDemandsBystatus(1).subscribe((res: any) => {
              if( this.vactionService.Tvisiblity.length!==0){
                this.vactionService.clearArray( this.vactionService.Tvisiblity);
                  }
              for (let item of res) {
                if(item.code_typeC=='1'){
                  this.vactionService.Tvisiblity.push(true)
                }else{
                  this.vactionService.Tvisiblity.push(false)
                 }
                }
                console.log( this.vactionService.Tvisiblity);
              this._demandsService.table.data = res ;
              this.tableService.isLoading = false;

            })
          })
          this.handleCancel(config);

        
      } 
      else if (config.name === "user") {
      if (!config.edit) {
        let birth_date =
          (this.userService.validateForm_private.value.birth_date = moment(
            this.userService.validateForm_private.value.birth_date
          ).format("YYYY-MM-DD"));

        let date_arrive = (this.userService.validateForm.value.date_arrive =
          moment(this.userService.validateForm.value.date_arrive).format(
            "YYYY-MM-DD"
          ));

        delete this.userService.validateForm.value.birth_date;
        delete this.userService.validateForm_private.value.date_arrive;

        let form = {
          ...this.userService.validateForm?.value,
          ...this.userService.validateForm_private?.value,
          birth_date,
          date_arrive,
          role: "employee",
        };
        this.tableService.isLoading = true;
        this.userService.addUser(form).subscribe((res: any) => {
          this.userService.getAllUsers({ page: 1 }).subscribe((res: any) => {
            this.userService.table.data = res.data;
            this.userService.total = res.total;
            this.tableService.isLoading = false;
          });
        });
        this.handleCancel(config);
      } else {
        let birth_date =
          (this.userService.validateForm_private.value.birth_date = moment(
            this.userService.validateForm_private.value.birth_date
          ).format("YYYY-MM-DD"));

        let date_arrive = (this.userService.validateForm.value.date_arrive =
          moment(this.userService.validateForm.value.date_arrive).format(
            "YYYY-MM-DD"
          ));

        delete this.userService.validateForm.value.birth_date;
        delete this.userService.validateForm_private.value.date_arrive;

        let form = {
          ...this.userService.validateForm?.value,
          ...this.userService.validateForm_private?.value,
          birth_date,
          date_arrive,
          role: "employee",
        };
        this.tableService.isLoading = true;
        this.userService
          .updataUser(this.userService.SELECTED_USER.id, form)
          .subscribe((res: any) => {
            this.userService.getAllUsers(1).subscribe((res: any) => {
              this.userService.table.data = res.data;
              this.userService.total = res.total;
              this.tableService.isLoading = false;
            });
          });
        this.handleCancel(config);
      }
    }else if (config.name==="tache"){
      
      if(!config.edit){
        let start_date =
            (this.planningService.validateForm_tache.value.start_date = moment(
              this.planningService.validateForm_tache.value.start_date
            ).format("YYYY-MM-DD"));
  
          let end_date = (this.planningService.validateForm_tache.value.end_date =
            moment(this.planningService.validateForm_tache.value.end_date).format(
              "YYYY-MM-DD"
            ));
  
          delete this.planningService.validateForm_tache.value.start_date;
          delete this.planningService.validateForm_tache.value.start_date;
          let idplanning = this.planningService.idPlanning;

          let form = {
            ...this.planningService.validateForm_tache?.value,
            start_date,
            end_date,
            idplanning
  
          };
          this.planningService.addTache(form).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              text: "Voulez vous ajouter autre tâche pour ce projet ?",
              showCancelButton: true,
              confirmButtonColor: '#1890ff',
              cancelButtonColor: '#808080',
              confirmButtonText: 'Oui',
              cancelButtonText: 'Non'
            }).then((result) => 
            {
              if (result.value) {
                this.planningService.validateForm_tache?.reset();
                this.planningService.validateForm_tache.controls.end_date.setValue('');
              }else{
                this.tableService.isLoading = true;
                console.log(this.planningService.liste_employees)
                this.planningService.getAllplanning(1).subscribe((res: any) => {
                  for (let item of res.data) {
                    item.expand=false;
                    item.liste_employees = JSON.parse(item.liste_employees)
                    item.liste_employees.forEach((value, index, array) => {
                      array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
                      , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
                    }  
                    })
                  }
                  res.data[this.tableService.index].expand=true;
                  this.planningService.getTache(idplanning).subscribe((res:any)=>{
                    this.tableService.listeTache.data=res;
                   })
                  this.planningService.table.data = res.data;
                  this.planningService.total = res.total;
                  this.tableService.isLoading = false;
                });
                this.handleCancel(config);

              }
            })
        }) 
        
      }else{
        let start_date =
        (this.planningService.validateForm_tache.value.start_date = moment(
          this.planningService.validateForm_tache.value.start_date
        ).format("YYYY-MM-DD"));
  
      let end_date = (this.planningService.validateForm_tache.value.end_date =
        moment(this.planningService.validateForm_tache.value.end_date).format(
          "YYYY-MM-DD"
        ));
  
      delete this.planningService.validateForm_tache.value.start_date;
      delete this.planningService.validateForm_tache.value.start_date;
      let idplanning = this.planningService.idPlanning
      let form = {
        ...this.planningService.validateForm_tache?.value,
        start_date,
        end_date,
        idplanning
  
      };
      console.log(this.planningService.idtache)
      this.planningService.updateTache(this.planningService.idtache,form).subscribe((res: any) => {
        console.log(res);
        this.tableService.isLoading = true;
            console.log(this.planningService.liste_employees)
            this.planningService.getAllplanning(1).subscribe((res: any) => {
              for (let item of res.data) {
                item.expand=false;
                item.liste_employees = JSON.parse(item.liste_employees)
                item.liste_employees.forEach((value, index, array) => {
                  array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
                  , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
                }  
                })
              }
              res.data[this.tableService.index].expand=true;
              this.planningService.getTache(idplanning).subscribe((res:any)=>{
                this.tableService.listeTache.data=res;
               })
              this.planningService.table.data = res.data;
              this.planningService.total = res.total;
              this.tableService.isLoading = false;
            });
          });
          this.handleCancel(config);

      }
    }
    else if (config.name === "planning") {
      if (this.planningService.posttache == true) {
        let start_date =
          (this.planningService.validateForm_tache.value.start_date = moment(
            this.planningService.validateForm_tache.value.start_date
          ).format("YYYY-MM-DD HH:mm"));

        let end_date = (this.planningService.validateForm_tache.value.end_date =
          moment(this.planningService.validateForm_tache.value.end_date).format(
            "YYYY-MM-DD HH:mm"
          ));

        delete this.planningService.validateForm_tache.value.start_date;
        delete this.planningService.validateForm_tache.value.start_date;
        let idplanning = this.planningService.idPlanning
        let form = {
          ...this.planningService.validateForm_tache?.value,
          start_date,
          end_date,
          idplanning

        };
        
        this.planningService.addTache(form).subscribe((res: any) => {
          Swal.fire({
            text: "Voulez vous ajouter d'autre tâche pour ce projet ?",
            showCancelButton: true,
            confirmButtonColor: '#1890ff',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
          }).then((result) => 
          {
            if (result.value) {
              this.planningService.validateForm_tache?.reset();
              this.planningService.validateForm_tache.controls.end_date.setValue('');
            }else{
              this.tableService.isLoading = true;
              this.planningService.getAllplanning(1).subscribe((res: any) => {
                for (let item of res.data) {
                  item.expand=false;
                  item.liste_employees = JSON.parse(item.liste_employees)
                  item.liste_employees.forEach((value, index, array) => {
                    array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
                    , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
                  }  
                  })
                }
                this.planningService.table.data = res.data;
                this.planningService.total = res.total;
                this.tableService.isLoading = false;
              });
              
              this.handleCancel(config);

            }
            
          })
      })
      
      

      }
      if (!config.edit && !this.planningService.posttache) {
        let start_date =
          (this.planningService.validateForm_general.value.start_date = moment(
            this.planningService.validateForm_general.value.start_date
          ).format("YYYY-MM-DD"));

        let end_date = (this.planningService.validateForm_general.value.end_date =
          moment(this.planningService.validateForm_general.value.end_date).format(
            "YYYY-MM-DD"
          ));

          let dateProd = (this.planningService.validateForm_general.value.dateProd =
            moment(this.planningService.validateForm_general.value.dateProd).format(
              "YYYY-MM-DD"
            ));
            console.log(dateProd)
        delete this.planningService.validateForm_general.value.start_date;
        delete this.planningService.validateForm_general.value.dateProd;
        delete this.planningService.validateForm_general.value.start_date;

        let form = {
          ...this.planningService.validateForm_general?.value,
          start_date,
          end_date,
          dateProd ,

        };
        this.planningService.addPlanning(form).subscribe((res: any) => {
          this.planningService.liste_employees = JSON.parse(res.liste_employees)
          this.tableService.isLoading = true;
          if( this.planningService.Tvisiblity.length!==0){
            this.planningService.clearArray(this.planningService.Tvisiblity);
       }
          this.planningService.getAllplanning(1).subscribe((res: any) => {
            for (let item of res.data) {
              item.expand=false;
              if(item.type_planning=='projet'){
                this.planningService.Tvisiblity.push(true)
              }else{
                this.planningService.Tvisiblity.push(false)
               }
              item.liste_employees = JSON.parse(item.liste_employees)
              item.liste_employees.forEach((value, index, array) => {
                array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
                , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
              }  
              })
            }
            this.planningService.table.data = res.data;
            this.planningService.total = res.total;
            this.tableService.isLoading = false;
          });
        });
        this.handleCancel(config);

      }
      if (config.edit) {
        let start_date =
          (this.planningService.validateForm_general.value.start_date = moment(
            this.planningService.validateForm_general.value.start_date
          ).format("YYYY-MM-DD h:mm:ss"));

        let end_date = (this.planningService.validateForm_general.value.end_date =
          moment(this.planningService.validateForm_general.value.end_date).format(
            "YYYY-MM-DD h:mm:ss"
          ));
        delete this.planningService.validateForm_general.value.start_date;
        delete this.planningService.validateForm_general.value.start_date;
        let type_Planning= this.planningService.SELECTED_planning.type_planning
        let form = {
          ...this.planningService.validateForm_general?.value,
          start_date,
          end_date,
          type_Planning
        };
        this.tableService.isLoading = true;
        
        this.planningService.updataplanning(this.planningService.SELECTED_planning.id, form)
          .subscribe((res: any) => {
            if( this.planningService.Tvisiblity.length!==0){
              this.planningService.clearArray(this.planningService.Tvisiblity);
         }
         Swal.fire({
          title: 'veuillez modifier les dates des taches convenablement avec la date de projet!',
          icon: 'info',
          confirmButtonColor: '#1890ff',
          confirmButtonText: 'Ok',
        })
       
            this.planningService.getAllplanning(1).subscribe((res: any) => {
              for (let item of res.data) {
                item.expand=false;
                if(item.type_planning=='projet'){
                  this.planningService.Tvisiblity.push(true)
                }else{
                  this.planningService.Tvisiblity.push(false)
                 }
                item.liste_employees = JSON.parse(item.liste_employees)
                item.liste_employees.forEach((value, index, array) => {
                  array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
                  , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
                }  
                })
              }
              this.planningService.table.data = res.data;
              this.planningService.total = res.total;
              this.tableService.isLoading = false;
            });
          });
          this.handleCancel(config);
      }

    }
    else if (config.name === "post") {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.postService
          .addPost(this.postService.validateForm?.value)
          .subscribe((res: any) => {
            this.postService.getUsersPosts(1).subscribe((res: any) => {
              this.postService.table.data = res.data;
              this.postService.total = res.total;
              this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      } else {
        this.tableService.isLoading = true;
        this.postService.updatePost(this.postService.validateForm?.value).subscribe((res: any) => {
            this.postService.getUsersPosts(1).subscribe((res: any) => {
            this.postService.table.data = res.data;
            this.postService.total = res.total;
            this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      }
    }

    else if (config.name === "parametre") {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.paramsService
          .addParams(this.paramsService.validateForm?.value)
          .subscribe((res: any) => {
            this.paramsService.getParams(1).subscribe((res: any) => {
              this.paramsService.table.data = res.data;
              this.paramsService.total = res.total;
              this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      } else {
        this.tableService.isLoading = true;
        this.paramsService.updateParams(this.paramsService.validateForm?.value).subscribe((res: any) => {
            this.paramsService.getParams(1).subscribe((res: any) => {
            this.paramsService.table.data = res.data;
            this.paramsService.total = res.total;
            this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      }
    }

    else if (config.name === "type planning") {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.typePlanService
          .addTypePlanning(this.typePlanService.validateForm?.value)
          .subscribe((res: any) => {
            this.typePlanService.getTypePlanning(1).subscribe((res: any) => {
              this.typePlanService.table.data = res.data;
              this.typePlanService.total = res.total;
              this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      } else {
        this.tableService.isLoading = true;
        this.typePlanService.updateTypePlanning(this.typePlanService.validateForm?.value).subscribe((res: any) => {
            this.typePlanService.getTypePlanning(1).subscribe((res: any) => {
            this.typePlanService.table.data = res.data;
            this.typePlanService.total = res.total;
            this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      }
    }

    else if (config.name === "type demande") {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.typeDemandeService
          .addTypeDemande(this.typeDemandeService.validateForm?.value)
          .subscribe((res: any) => {
            this.typeDemandeService.getTypeDemande(1).subscribe((res: any) => {
              this.typeDemandeService.table.data = res;
              this.typeDemandeService.total = res.total;
              this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);

      } else {
        this.tableService.isLoading = true;
        this.typeDemandeService.updateTypeDemande(this.typeDemandeService.validateForm?.value).subscribe((res: any) => {
            this.typeDemandeService.getTypeDemande(1).subscribe((res: any) => {
            this.typeDemandeService.table.data = res.data;
            this.typeDemandeService.total = res.total;
            this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      }
    }

    else if (config.name === "type employee") {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.empService
          .addTypeEmployee(this.empService.validateForm?.value)
          .subscribe((res: any) => {
            this.empService.getTypeEmployee(1).subscribe((res: any) => {
              this.empService.table.data = res;
              this.empService.total = res.total;
              this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);

      } else {
        this.tableService.isLoading = true;
        this.empService.updateTypeEmployee(this.empService.validateForm?.value).subscribe((res: any) => {
            this.empService.getTypeEmployee(1).subscribe((res: any) => {
            this.empService.table.data = res;
            this.empService.total = res.total;
            this.tableService.isLoading = false;

            });
          });
        this.handleCancel(config);
      }
    }

    else if (config.name === 'type conge') {
      if (!config.edit) {
        this.tableService.isLoading = true;
        this.typeService.addTypes(this.typeService.validateForm?.value).subscribe((res: any) => {
          this.typeService.getTypes({ page: 1 }).subscribe((res: any) => {
            this.typeService.table.data = res.data;
            this.tableService.isLoading = false;
          })
        })
        this.handleCancel(config);
      } else {
        this.tableService.isLoading = true;
        this.typeService.updateTypes(this.typeService.validateForm?.value).subscribe(() => {
          this.typeService.getTypes({ page: 1 }).subscribe((res: any) => {
            this.typeService.table.data = res.data;
            this.typeService.total = res.total;
            this.tableService.isLoading = false;
          })
        })
        this.handleCancel(config)
      }
    }
    else {
      this._demandsService.addCommentaire().subscribe((res: any) => {
        this._demandsService.getAllDemands({ page: 1 }).subscribe((res: any) => {
          this._demandsService.table.data = res.data;
          this.handleCancel(config)
        })
      })
    }
  }

  handleCancel(config: IModalConfig): void {
    switch (config.name) {
      case "command":
        this._commandService.isVisible = false;
        break;
      case "option":
        this._optionService.isVisible = false;
        this._optionService.validateForm?.reset();
        this._optionService.IS_VALID_IMAGE_INPUT = false;
        break;
      case "option_detail":
        this._optionService.isVisibleDetail = false;
        break;
      case "chef":
        this._chefService.isVisible = false;
        this._chefService.SELECTED_CHEF = null;
        this._chefService.validateForm?.reset();
        this._chefService.IS_VALID_IMAGE_INPUT = false;
        break;
      case "user":
        this.userService.isVisible = false;
        this.userService.SELECTED_USER = null;
        this.userService.validateForm?.reset();
        this.userService.current = 0;
        this.userService.validateForm_private?.reset();
        this.userService.isVisible = false;
        break;
      case "planning":
        this.planningService.isVisible = false;
        this.planningService.SELECTED_planning = null;
        this.planningService.validateForm_general?.reset();
        if (this.planningService.posttache == true) {
          this.planningService.typecode = 0;
          this.planningService.suivant = true;
          this.planningService.validateForm_tache?.reset();
          this.planningService.posttache = false;
          this.planningService.type = 0
          this.planningService.idPlanning=undefined;
        }
        break;

        case "post":
        this.postService.validateForm?.reset();
        this.postService.isVisible = false;
        this.postService.SELECTED_POST=null;
        break;

        case "vacation":
          this.vactionService.validateFormAdd?.reset();
          this.vactionService.typeSelect=null;
          this.vactionService.isVisible = false;
          this.vactionService.SELECTED_VACATION=null;
          break;

        case "parametre":
          this.paramsService.validateForm?.reset();
          this.paramsService.isVisible = false;
          this.paramsService.SELECTED_PARAMS = null;
          break;

          case "type planning":
            this.typePlanService.validateForm?.reset();
            this.typePlanService.isVisible = false;
            this.typePlanService.SELECTED_PLANNING = null;
            break;

        case "type demande":
          this.typeDemandeService.validateForm?.reset();
          this.typeDemandeService.isVisible = false;
          this.typeDemandeService.SELECTED_TYPE = null;
          break;

          case "type employee":
            this.empService.validateForm?.reset();
            this.typeDemandeService.isVisible = false;
            this.typeDemandeService.SELECTED_TYPE = null;
            break;

      case "tache":
        this.planningService.validateForm_tache?.reset();
        this.planningService.isVisible = false;
        this.planningService.SELECTED_planning = null;
        this.planningService.typecode = 0
     
       break;

      case "type conge":
        this.typeService.validateForm?.reset();
        this.typeService.isVisible = false;
        this.typeService.SELECTED_TYPE = null;
        break;
      case "detail-rapport":
        this.rapportService.isVisible=false;
        break;
      case "accept":
        this._demandsService.validateForm?.reset();
        this._demandsService.isVisible = false;
        this.rapportService.detail=false;
        break;
      default:
        break;
    }

    this.clean(config.name);
  }

  clean(str: string) {
    setTimeout(() => {
      this._appService.MODALS_NUMBER = this._appService.MODALS_NUMBER.filter(
        (item: string) => item !== str
      );
    }, 100);
  }

  submitCommand({ form: NgForm, config: IModalConfig }) { }
}
