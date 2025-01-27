import { MagicAttributeModel } from '@nocobase/database';
import { Application } from '@nocobase/server';
import { mergeOptions } from '../utils';

type LoadOptions = {
  app: Application;
};

export class DataSourcesFieldModel extends MagicAttributeModel {
  load(loadOptions: LoadOptions) {
    const { app } = loadOptions;

    const options = this.get();
    const { collectionName, name, dataSourceKey } = options;
    const dataSource = app.dataSourceManager.dataSources.get(dataSourceKey);
    const collection = dataSource.collectionManager.getCollection(collectionName);
    const oldField = collection.getField(name);

    const newOptions = mergeOptions(oldField ? oldField.options : {}, options);

    collection.setField(name, newOptions);

    // const interfaceOption = options.interface;

    // if (interfaceOption === 'updatedAt') {
    //   // @ts-ignore
    //   collection.model._timestampAttributes.createdAt = this.get('name');
    // }
    //
    // if (interfaceOption === 'createdAt') {
    //   // @ts-ignore
    //   collection.model._timestampAttributes.updatedAt = this.get('name');
    // }
  }

  unload(loadOptions: LoadOptions) {
    const { app } = loadOptions;
    const options = this.get();
    const { collectionName, name, dataSourceKey } = options;
    const dataSource = app.dataSourceManager.dataSources.get(dataSourceKey);
    const collection = dataSource.collectionManager.getCollection(collectionName);
    collection.removeField(name);
  }
}
