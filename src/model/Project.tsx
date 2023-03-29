export class Project {

    id: number | undefined;
    name: string = "";
    description: string = "";
    imageUrl: string = "";
    contractTypeId: number | undefined;
    contractSignedOn: Date = new Date();
    budget: number = 0;
    isActive: boolean = false;

    constructor(initializer: Partial<Project>) {
        if (!initializer) return;
        Object.assign(this, initializer);
    }

    get isNew(): boolean {
        return this.id === undefined;
    }
}
