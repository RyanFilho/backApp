import { Component } from './../../../component/component';

export class ComponentFilter extends Component {// TODO
  // arrayFEBlend: Array<ComponentFEBlend>;
  // arrayFEColorMatrix: Array<ComponentFEColorMatrix>;
  // arrayFEComponentTransfer: Array<ComponentFEComponentTransfer>;
  // arrayFEComposite: Array<ComponentFEComposite>;
  // arrayFEConvolveMatrix: Array<ComponentFEConvolveMatrix>;
  // arrayFEDiffuseLighting: Array<ComponentFEDiffuseLighting>;
  // arrayFEDisplacementMap: Array<ComponentFEDisplacementMap>;
  // arrayFEFlood: Array<ComponentFEFlood>;
  // arrayFEGaussianBlur: Array<ComponentFEGaussianBlur>;
  // arrayFEImage: Array<ComponentFEImage>;
  // arrayFEMerge: Array<ComponentFEMerge>;
  // arrayFEMorphology: Array<ComponentFEMorphology>;
  // arrayFEOffset: Array<ComponentFEOffset>;
  // arrayFESpecularLighting: Array<ComponentFESpecularLighting>;
  // arrayFETile: Array<ComponentFE>;
  // arrayFETurbulence: Array<ComponentFETurbulence>;
  // arrayFEDistantLight: Array<ComponentFEDistantLight>;
  // arrayFEPointLight: Array<ComponentFEPointLight>;
  // arrayFESpotLight: Array<ComponentFESpotLight>;

  constructor(father?: Component) {
    super('filter', father, true);
    this.className = 'ComponentFilter';
    // this.arrayFEBlend = new Array<ComponentFEBlend>();
    // this.arrayFEBlend.type = ComponentFEBlend;
  }
}
ComponentFilter.addConstructor('ComponentFilter', ComponentFilter);
