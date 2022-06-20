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

const NBTBaseBinaryStream = require("./NBTBaseBinaryStream");

class NBTLEBinaryStream extends NBTBaseBinaryStream {
	readShort() {
		return this.readShortLE();
	}

	writeShort(value) {
		this.writeShortLE(value);
	}

	readInt() {
		return this.readIntLE();
	}

	writeInt(value) {
		this.writeIntLE(value);
	}

	readLong() {
		return this.readLongLE();
	}

	writeLong(value) {
		this.writeLongLE(value);
	}

	readFloat() {
		return this.readFloatLE();
	}

	writeFloat(value) {
		this.writeFloatLE(value);
	}

	readDouble() {
		return this.readDoubleLE();
	}

	writeDouble(value) {
		this.writeDoubleLE(value);
	}

	readStrlen() {
		return this.readUnsignedShortLE();
	}

	writeStrlen(value) {
		this.writeUnsignedShortLE(value);
	}
}

module.exports = NBTLEBinaryStream;