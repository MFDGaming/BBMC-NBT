/******************************************\
 *  ____  _            ____  _         _  *
 * | __ )| |_   _  ___| __ )(_)_ __ __| | *
 * |  _ \| | | | |/ _ \  _ \| | '__/ _` | *
 * | |_) | | |_| |  __/ |_) | | | | (_| | *
 * |____/|_|\__,_|\___|____/|_|_|  \__,_| *
 *                                        *
 * This file is licensed under the GNU    *
 * General Public License 3. To use or    *
 * modify it you must accept the terms    *
 * of the license.                        *
 * ___________________________            *
 * \ @author BlueBirdMC Team /            *
\******************************************/

const NBTLEBinaryStream = require("./NBTLEBinaryStream");

class NBTNetworkBinaryStream extends NBTLEBinaryStream {
	readInt() {
		return this.readSignedVarInt();
	}

	writeInt(value) {
		this.writeSignedVarInt(value);
	}

	readLong() {
		return this.readSignedVarLong();
	}

	writeLong(value) {
		this.writeSignedVarLong(value);
	}

	readStrlen() {
		return this.readVarInt();
	}

	writeStrlen(value) {
		this.writeVarInt(value);
	}
}

module.exports = NBTNetworkBinaryStream;