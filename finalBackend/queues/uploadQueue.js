import {Queue} from 'bullmq'

const conn = {
    host:'redis',
    port:6379
}

const uploadQueue = new Queue('uploadQueue',conn)

export default uploadQueue;
