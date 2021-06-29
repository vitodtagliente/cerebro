
type NetworkId = string;
export default NetworkId;

export const InvalidNetworkId: NetworkId = "";

export function nextNetworkId(): NetworkId
{
    var magic: number = Math.random() * (new Date()).getTime();
    return magic.toString(36).substr(2, 9);
}