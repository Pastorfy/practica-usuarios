import Info from './Info'
interface Crud {
    create(): Promise<Info>
    delete(): Promise<Info>
    update(): Promise<Info>
    get(): Promise<Info>
    getOne(): Promise<Info>
}
export default Crud;