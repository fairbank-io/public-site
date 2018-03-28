import * as jQuery from 'jquery';

/* tslint:disable:no-any */
class FormSerializer {
  pairs: JQuery.NameValuePair[];
  patterns: object;
  pushes: object;
  data: object;

  constructor(pairs: JQuery.NameValuePair[]) {
    this.pairs = pairs;
    this.pushes = {};
    this.data = {};
    this.patterns = {
      validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
      key:      /[a-z0-9_]+|(?=\[\])/gi,
      push:     /^$/,
      fixed:    /^\d+$/,
      named:    /^[a-z0-9_]+$/i
    };
    for (let i: number = 0, len = this.pairs.length; i < len; i++) {
      this.addPair(pairs[i]);
    }
  }

  public serialize(): object {
    return this.data;
  }

  private addPair(el: JQuery.NameValuePair) {
    let validate: RegExp = /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i;
    if (!validate.test(el.name)) {
      return;
    }
    let obj = this.makeObject(el.name, el.value);
    this.data = jQuery.extend(true, this.data, obj);
    return this;
  }

  private makeObject(root: string, value: any): object {
    let keys: RegExpMatchArray | null = root.match(/[a-z0-9_]+|(?=\[\])/gi), k;
    if (keys) {
      while ((k = keys.pop()) !== undefined) {
        if (/^$/.test(k)) {
          // foo[]
          let idx = this.incrementPush(root.replace(/\[\]$/, ''));
          value = this.build([], idx, value);
        } else if (/^\d+$/.test(k)) {
          // foo[n]
          value = this.build([], k, value);
        } else if (/^[a-z0-9_]+$/i.test(k)) {
          // foo; foo[bar]
          value = this.build({}, k, value);
        }
      }
    }
    return value;
  }

  private incrementPush(key: string) {
    if (this.pushes[key] === undefined) {
      this.pushes[key] = 0;
    }
    return this.pushes[key]++;
  }

  private build(base: object, key: string | number, value: any): object {
    base[key] = value;
    return base;
  }
}

export function serializeFormData(pairs: JQuery.NameValuePair[]): object {
  let fs: FormSerializer = new FormSerializer(pairs);
  return fs.serialize();
}