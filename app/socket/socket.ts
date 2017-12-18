import * as io from 'socket.io-client';
import * as  uuidv4 from 'uuid/v4';
import * as  crypto from 'crypto';
const IV_LENGTH = 16; // For AES, this is always 16

export class Socket {
    private static instance: Socket;
    private socket;
    private key;
    // private subscribers: Array<any>;

    constructor() {
        this.socket = io();
        // this.subscribers = new Array<any>();
    }

    public static getInstance(): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }

    public static generateKey(size: number){
        return crypto.randomBytes(size);
    }

    public setKey(key) {
        this.key = key;
        // this.publish('key');
    }

    public encrypt(object: Object) {
        let objectText: string = JSON.stringify(object);
        let objectBuffer: Buffer = new Buffer(objectText);
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(this.key), iv);
        let encrypted = cipher.update(objectBuffer);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    public decrypt(objectText: string) {
        let textParts = objectText.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(this.key), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        let object: Object = JSON.parse(decrypted.toString());
        return object;
    }

    public emit(messageName, message) {
        let _self = this;
        if (_self.key == undefined){
            // _self.subscribe(() => {
            //     _self.socket.emit(messageName, _self.encrypt(message));
            // });
            _self.socket.emit(messageName, message);
        }else{
            _self.socket.emit(messageName, _self.encrypt(message));
        }

    }

    public on(messageName, callback) {
        let _self = this;
        this.socket.on(messageName, (message) => {
            if (_self.key == undefined){
                callback(message);
            }else{
                callback(_self.decrypt(message));
            }
            
        });
    }

    // public subscribe(callback) {
    //     //we could check to see if it is already subscribed
    //     this.subscribers.push(callback);
    //     console.log(callback.name, 'has been subscribed to Disk');
    // }

    // public unsubscribe(callback) {
    //     this.subscribers = this.subscribers.filter((element) => {
    //         return element !== callback;
    //     });
    // }

    // public publish(data) {
    //     this.subscribers.forEach((subscriber) => {
    //         subscriber(data);
    //     });
    // }
}