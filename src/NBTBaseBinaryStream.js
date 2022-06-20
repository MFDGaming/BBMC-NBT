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

const BinaryStream = require("bbmc-binarystream");
const Byte = require("./tag/Byte");
const ByteArray = require("./tag/ByteArray");
const Compound = require("./tag/Compound");
const Double = require("./tag/Double");
const Float = require("./tag/Float");
const Int = require("./tag/Int");
const IntArray = require("./tag/IntArray");
const List = require("./tag/List");
const Long = require("./tag/Long");
const LongArray = require("./tag/LongArray");
const Short = require("./tag/Short");
const Str = require("./tag/Str");

class NBTBaseBinaryStream extends BinaryStream {
	readShort() {}

	writeShort(value) {}

	readInt() {}

	writeInt(value) {}

	readLong() {}

	writeLong(value) {}

	readFloat() {}

	writeFloat(value) {}

	readDouble() {}

	writeDouble(value) {}

	readStrlen() {}

	writeStrlen(value) {}

	readString() {
		return this.read(this.readStrlen()).toString("utf8");
	}

	writeString(value) {
		let buffer = Buffer.from(value);
		this.writeStrlen(buffer.length);
		this.write(buffer);
	}

	readByteTag(name = "") {
		return new Byte(name, this.readByte());
	}

	writeByteTag(value) {
		this.writeByte(value.value);
	}

	readShortTag(name = "") {
		return new Short(name, this.readShort());
	}

	writeShortTag(value) {
		this.writeShort(value.value);
	}

	readIntTag(name = "") {
		return new Int(name, this.readInt());
	}

	writeIntTag(value) {
		this.writeInt(value.value);
	}

	readLongTag(name = "") {
		return new Long(name, this.readLong());
	}

	writeLongTag(value) {
		this.writeLong(value.value);
	}

	readFloatTag(name = "") {
		return new Float(name, this.readFloat());
	}

	writeFloatTag(value) {
		this.writeFloat(value.value);
	}

	readDoubleTag(name = "") {
		return new Double(name, this.readDouble());
	}

	writeDoubleTag(name = "") {
		this.writeDouble(value.value);
	}

	readByteArrayTag(name = "") {
		let length = this.readInt();
		let value = [];
		for (let i = 0; i < length; ++i) {
			value.push(this.readByte())
		}
		return new ByteArray(name, value);
	}

	writeByteArrayTag(value) {
		this.writeInt(value.value.length);
		value.value.forEach(entry => this.writeByte(entry));
	}

	readStrTag(name = "") {
		return new Str(name, this.readString());
	}

	writeStrTag(value) {
		this.writeString(value.value);
	}

	readListTag(name = "") {
		let id = this.readByte();
		let length = this.readInt();
		let value = [];
		for (let i = 0; i < length; ++i) {
			value.push(this.readTag(id));
		}
		return new List(name, id, value);
	}

	writeListTag(value) {
		this.writeByte(value.type);
		this.writeInt(value.value.length);
		value.value.forEach(tag => this.writeTag(tag));
	}

	readCompoundTag(name = "") {
		let value = [];
		while (this.feos() !== true) {
			let id = this.readByte();
			if (id === 0) {
				break;
			}
			value.push(this.readTag(id, this.readString()));
		}
		return new Compound(name, value);
	}

	writeCompoundTag(value) {
		value.value.forEach(tag => {
			this.writeByte(tag.constructor.id);
			this.writeString(tag.tagName);
			this.writeTag(tag);
		});
		this.writeByte(0);
	}

	readIntArrayTag(name = "") {
		let length = this.readInt();
		let value = [];
		for (let i = 0; i < length; ++i) {
			value.push(this.readInt())
		}
		return new IntArray(name, value);
	}

	writeIntArrayTag(value) {
		this.writeInt(value.value.length);
		value.value.forEach(entry => this.writeInt(entry));
	}

	readLongArrayTag(name = "") {
		let length = this.readInt();
		let value = [];
		for (let i = 0; i < length; ++i) {
			value.push(this.readLong())
		}
		return new LongArray(name, value);
	}

	writeLongArrayTag(value) {
		this.writeInt(value.value.length);
		value.value.forEach(entry => this.writeLong(entry));
	}

	readTag(id, name = "") {
		switch (id) {
			case Byte.id:
				return this.readByteTag(name);
			case Short.id:
				return this.readShortTag(name);
			case Int.id:
				return this.readIntTag(name);
			case Float.id:
				return this.readFloatTag(name);
			case Double.id:
				return this.readDoubleTag(name);
			case ByteArray.id:
				return this.readByteArrayTag(name);
			case Str.id:
				return this.readStrTag(name);
			case List.id:
				return this.readListTag(name);
			case Compound.id:
				return this.readCompoundTag(name);
			case IntArray.id:
				return this.readIntArrayTag(name);
			case LongArray.id:
				return this.readLongArrayTag(name);
			default:
				throw Error("Invalid tag");
		}
	}

	writeTag(value) {
		switch (value.constructor.id) {
			case Byte.id:
				this.writeByteTag(value);
				break;
			case Short.id:
				this.writeShortTag(value);
				break;
			case Int.id:
				this.writeIntTag(value);
				break;
			case Float.id:
				this.writeFloatTag(value);
				break;
			case Double.id:
				this.writeDoubleTag(value);
				break;
			case ByteArray.id:
				this.writeByteArrayTag(value);
				break;
			case Str.id:
				this.writeStrTag(value);
				break;
			case List.id:
				this.writeListTag(value);
				break;
			case Compound.id:
				this.writeCompoundTag(value);
				break;
			case IntArray.id:
				this.writeIntArrayTag(value);
				break;
			case LongArray.id:
				this.writeLongArrayTag(value);
				break;
			default:
				throw Error("Invalid tag");
		}
	}

	readRootTag() {
		let id = this.readByte();
		if (id !== 0) {
			return this.readTag(id, this.readString());
		}
	}

	writeRootTag(value) {
		this.writeByte(value.constructor.id);
		this.writeString(value.tagName);
		this.writeTag(value);
	}
}

module.exports = NBTBaseBinaryStream;