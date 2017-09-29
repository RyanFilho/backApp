importJS('app/view/common/component/component');

class ComponentInformation extends Component {
  code: boolean;
  appObject: AppObject;
  information: string;
  language: string;
  item: ComponentItem;
  

  constructor(father?: Component) {
    super(father, "a");
    this.getItem();
    // this.item=new ComponentItem(this.element);
  }

  private getItem(){
    this.item = <ComponentItem>this.seekFatherComponent("ComponentItem");
  }

  public renderAfterUpdateJSON() {
    if (this.language == undefined) {
      this.getLanguage();
    }
    if(this.code){
      // var age = new this.className();//window[this.className]();
      this.appObject = AppObjectFactory.create(this.information,this.father);
      // console.log("CODE:" + this.code);
      // console.log("appClass:" + this.appObject.result());
      this.appObject.result(this.element);
    }
    if(!this.element.innerHTML){
      this.element.innerHTML = this.information;
    }
    
  }

  protected getLanguage() {
    if(this.item!=undefined){
      if (this.item.getPage() != undefined) {
        // console.log("PAGE:" + this.item.getPage());
        this.getJSONLanguagePromise(this.item.getPage() + "L");
      }
    }
  }

  protected updateLanguage(jSON) {
    var property;
    for (property in jSON) {
      if (property != undefined) {
        if (!jSON.hasOwnProperty(property)) {
          continue;
        }

        if (jSON[property]["language"] == Util.getCurrentLanguage()) {
          // console.log("LANG:"+jSON[property]["language"]);
          break;
        }
      }
    }
    // console.log("selected lan:"+property);
    var subJSON = jSON[property];
    for (var languageProperty in subJSON) {
      if (languageProperty != undefined) {
        if (!subJSON.hasOwnProperty(languageProperty)) {
          continue;
        }

        if (languageProperty == this.information) {
          if(subJSON[languageProperty].constructor === Array){
            this.element.innerHTML = "";
            subJSON[languageProperty].forEach(element => {
              this.element.innerHTML += element+"<br/>";
            });
          }else{
            this.element.innerHTML = subJSON[languageProperty];
          }
          // console.log("INNER:"+subJSON[languageProperty]);
        }
      }
    }
  }
}